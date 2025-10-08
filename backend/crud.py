from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas
from models import User, Order, Product
from passlib.context import CryptContext
from datetime import date

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# -------------------------
# USER FUNCTIONS
# -------------------------
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_all_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        name=user.name,
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        disabled=False,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def update_user(db: Session, db_user: models.User, updates: schemas.UserUpdate):
    if updates.email is not None:
        db_user.email = updates.email
    if updates.full_name is not None:
        db_user.full_name = updates.full_name
    if updates.disabled is not None:
        db_user.disabled = updates.disabled
    db.commit()
    db.refresh(db_user)
    return db_user

# -------------------------
# PRODUCT FUNCTIONS
# -------------------------
def get_all_products_with_reviews(db: Session):
    """
    Fetch all products with:
    - total number of reviews
    - average rating
    - price and stock info (S/M/L, kids)
    """
    results = (
        db.query(
            models.Product.id,
            models.Product.name,
            models.Product.image,
            models.Product.images,
            models.Product.collection,
            func.count(models.Review.id).label("total_reviews"),
            func.coalesce(func.avg(models.Review.stars), 0).label("average_rating"),
            models.PriceAndStock.S_price,
            models.PriceAndStock.M_price,
            models.PriceAndStock.L_price,
            models.PriceAndStock.S_stock,
            models.PriceAndStock.M_stock,
            models.PriceAndStock.L_stock,
            models.PriceAndStock.kids,
        )
        .outerjoin(models.Review, models.Product.id == models.Review.product_id)
        .outerjoin(models.PriceAndStock, models.Product.id == models.PriceAndStock.product_id)
        .group_by(models.Product.id)
        .group_by(models.PriceAndStock.id)
        .all()
    )

    products = []
    for r in results:
        products.append(
            schemas.ProductResponse(
                id=r.id,
                name=r.name,
                image=r.image,
                images=r.images,
                collection=r.collection,
                total_reviews=r.total_reviews,
                average_rating=round(float(r.average_rating or 0), 2),
                S_price=r.S_price,
                M_price=r.M_price,
                L_price=r.L_price,
                S_stock=r.S_stock,
                M_stock=r.M_stock,
                L_stock=r.L_stock,
                kids=r.kids,
            )
        )
    return products

# -------------------------
# REVIEW FUNCTIONS
# -------------------------
def get_reviews_by_product(db: Session, product_id: str):
    """
    Fetch all reviews for a specific product, including username, stars, text, and time.
    """
    results = (
        db.query(
            models.User.username,
            models.Review.stars,
            models.Review.text,
            models.Review.time,
        )
        .join(models.Review, models.User.id == models.Review.user_id)
        .filter(models.Review.product_id == product_id)
        .order_by(models.Review.time.desc())  # Latest first
        .all()
    )

    return [
        schemas.ReviewDetail(
            username=r.username,
            stars=r.stars,
            text=r.text,
            time=r.time,
        )
        for r in results
    ]

# -------------------------
# GET ALL PRODUCTS IN USER CART
# -------------------------
def get_user_cart(db: Session, user_id: int):
    """
    Returns all products in a user's cart with product name, collection,
    size, quantity, image, and total number of distinct products.
    """
    results = (
        db.query(
            models.Product.name.label("product_name"),
            models.Product.collection.label("collection"),
            models.Cart.size.label("size"),
            models.Cart.quantity.label("quantity"),
            models.Product.image.label("image")
        )
        .join(models.Cart, models.Product.id == models.Cart.product_id)
        .filter(models.Cart.user_id == user_id)
        .all()
    )

    items = [
        schemas.CartProduct(
            product_name=r.product_name,
            collection=r.collection,
            size=r.size,
            quantity=r.quantity,
            image=r.image,
        )
        for r in results
    ]

    total_products = len(items)
    return schemas.CartResponse(total_products=total_products, items=items)

# -------------------------
# GET ALL ORDERS OF ALL USER
# -------------------------
def get_all_orders(db: Session):
    """
    Fetch all orders from all users with product details.
    Each order contains:
    - order_id
    - username
    - status
    - total_products
    - products: list of {product_name, quantity, size}
    - order_time
    """
    orders = db.query(models.Order).all()
    order_responses = []

    for order in orders:
        username = order.user.username
        products_list = [
            schemas.OrderProduct(
                product_name=item.product.name,
                quantity=item.quantity,
                size=item.size
            )
            for item in order.items
        ]
        total_products = sum(item.quantity for item in order.items)
        order_responses.append(
            schemas.OrderResponse(
                order_id=order.id,
                username=username,
                status=order.status,
                total_products=total_products,
                products=products_list,
                order_time=order.time
            )
        )
    return order_responses

# -------------------------
# GET ALL ORDERS OF A SPECIFIC USER
# -------------------------
def get_user_orders(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return []
    orders_list = []
    orders = db.query(Order).filter(Order.user_id == user_id).all()
    for order in orders:
        products = []
        total_products = 0
        for item in order.items:
            product = db.query(Product).filter(Product.id == item.product_id).first()
            if product:
                products.append(schemas.OrderProduct(
                    product_name=product.name,
                    quantity=item.quantity,
                    size=item.size
                ))
                total_products += item.quantity
        orders_list.append(schemas.OrderResponse(
            order_id=order.id,
            username=user.username,
            status=order.status,
            total_products=total_products,
            products=products,
            order_time=order.time
        ))
    return orders_list

# -------------------------
# NEW CRUD FUNCTIONS
# -------------------------
def update_order_status(db: Session, order_id: int, status: str):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        return None
    order.status = status
    db.commit()
    db.refresh(order)
    return order

def get_order(db: Session, order_id: int):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        return None
    username = order.user.username
    products_list = [
        schemas.OrderProduct(
            product_name=item.product.name,
            quantity=item.quantity,
            size=item.size
        )
        for item in order.items
    ]
    total_products = sum(item.quantity for item in order.items)
    return schemas.OrderResponse(
        order_id=order.id,
        username=username,
        status=order.status,
        total_products=total_products,
        products=products_list,
        order_time=order.time
    )

def create_review(db: Session, review: schemas.ReviewCreate):
    try:
        review_time = date.fromisoformat(review.time)
    except ValueError:
        raise ValueError("Invalid date format. Use YYYY-MM-DD.")
    db_review = models.Review(
        stars=review.stars,
        text=review.text,
        time=review_time,
        user_id=review.user_id,
        product_id=review.product_id
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def get_review_detail(db: Session, review_id: int):
    result = (
        db.query(
            models.User.username,
            models.Review.stars,
            models.Review.text,
            models.Review.time,
        )
        .join(models.Review, models.User.id == models.Review.user_id)
        .filter(models.Review.id == review_id)
        .first()
    )
    if not result:
        return None
    return schemas.ReviewDetail(
        username=result.username,
        stars=result.stars,
        text=result.text,
        time=result.time,
    )

def update_cart_quantity(db: Session, user_id: int, product_id: str, size: str, quantity: int):
    cart_item = db.query(models.Cart).filter(
        models.Cart.user_id == user_id,
        models.Cart.product_id == product_id,
        models.Cart.size == size
    ).first()
    if not cart_item:
        return None
    cart_item.quantity = quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item

def remove_from_cart(db: Session, user_id: int, product_id: str, size: str):
    cart_item = db.query(models.Cart).filter(
        models.Cart.user_id == user_id,
        models.Cart.product_id == product_id,
        models.Cart.size == size
    ).first()
    if not cart_item:
        return None
    db.delete(cart_item)
    db.commit()
    return True



def add_to_cart(db: Session, cart_item: schemas.CartCreate):
    """
    Add a new item to the cart or update quantity if it already exists.
    """
    # Validate user and product existence
    user = db.query(models.User).filter(models.User.id == cart_item.user_id).first()
    if not user:
        return None
    product = db.query(models.Product).filter(models.Product.id == cart_item.product_id).first()
    if not product:
        return None

    # Check if the item already exists in the cart
    existing_cart_item = db.query(models.Cart).filter(
        models.Cart.user_id == cart_item.user_id,
        models.Cart.product_id == cart_item.product_id,
        models.Cart.size == cart_item.size
    ).first()

    if existing_cart_item:
        # Update quantity if item exists
        existing_cart_item.quantity += cart_item.quantity
        db.commit()
        db.refresh(existing_cart_item)
        return existing_cart_item

    # Create new cart item
    db_cart_item = models.Cart(
        user_id=cart_item.user_id,
        product_id=cart_item.product_id,
        size=cart_item.size,
        quantity=cart_item.quantity
    )
    db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item