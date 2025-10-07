from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date



# -------------------------
# USER SCHEMAS
# -------------------------
class UserBase(BaseModel):
    name: Optional[str] = None
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    disabled: bool

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None


# -------------------------
# PRODUCT & REVIEW SCHEMAS
# -------------------------
class ReviewBase(BaseModel):
    stars: float
    time: str
    user_id: int
    product_id: str


class ReviewResponse(ReviewBase):
    id: int

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    id: str
    name: str
    image: str
    images: Optional[List[str]] = None
    collection: str


class ProductResponse(ProductBase):
    total_reviews: int
    average_rating: Optional[float] = 0.0
    S_price: int
    M_price: int
    L_price: int
    S_stock: float
    M_stock: float
    L_stock: float
    kids: Optional[bool] = None

    class Config:
        from_attributes = True
        
        

# -------------------------
# REVIEW SCHEMAS
# -------------------------

class ReviewResponse(BaseModel):
    username: str
    stars: float
    text: Optional[str] = None
    time: date

    class Config:
        from_attributes = True
        
        
        

# -------------------------
# CART RESPONSE SCHEMA
# -------------------------
class CartProduct(BaseModel):
    product_name: str
    collection: str
    size: str
    quantity: int
    image: str

    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    total_products: int
    items: List[CartProduct]
    
    
    

# -------------------------
# ORDER RESPONSE SCHEMA
# -------------------------
class OrderProduct(BaseModel):
    product_name: str
    quantity: int
    size: str

class OrderResponse(BaseModel):
    order_id: int
    username: str
    status: str
    total_products: int
    products: List[OrderProduct]
    order_time: date

    class Config:
        from_attributes = True

