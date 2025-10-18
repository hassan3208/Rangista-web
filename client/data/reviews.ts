import type { CartItem } from "@/context/CartContext";
import { API_BASE_URL } from "@/lib/api-config";

export type Review = {
  id: string;
  userId: string;
  orderId: string;
  productId: string;
  productName: string;
  rating: number;
  comment?: string;
  createdAt: number;
  size?: CartItem["size"];
};

const LS_REVIEWS = "rangista_reviews";

type ReviewKeyInput = {
  userId: string;
  orderId: string;
  productId: string;
  size?: CartItem["size"];
};

type CreateReviewInput = ReviewKeyInput & {
  productName: string;
  rating: number;
  comment?: string;
};

// Local storage fallback for reading reviews
function read(): Review[] {
  try {
    // const raw = localStorage.getItem(LS_REVIEWS);
    const raw = sessionStorage.getItem(LS_REVIEWS);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

// Local storage write (kept for createReview compatibility)
function write(list: Review[]) {
  // localStorage.setItem(LS_REVIEWS, JSON.stringify(list));
  sessionStorage.setItem(LS_REVIEWS, JSON.stringify(list));
  try {
    window.dispatchEvent(new CustomEvent("reviews:change"));
  } catch {}
}

function matchesKey(review: Review, key: ReviewKeyInput) {
  return (
    review.userId === key.userId &&
    review.orderId === key.orderId &&
    review.productId === key.productId &&
    (review.size ?? "") === (key.size ?? "")
  );
}

// Fetch reviews from API
async function fetchReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`);
    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error("Failed to fetch reviews");
    }
    const data: { username: string; stars: number; text?: string; time: string }[] = await response.json();
    return data.map((item) => ({
      id: crypto.randomUUID(), // Generate ID since API doesn't provide one
      userId: item.username,
      orderId: "", // Not provided by API, using empty string
      productId,
      productName: "", // Not provided by API, using empty string
      rating: Math.round(item.stars), // Round to nearest integer to match Review type
      comment: item.text?.trim() ? item.text.trim() : undefined,
      createdAt: new Date(item.time).getTime(),
      size: undefined, // Not provided by API
    }));
  } catch {
    return [];
  }
}

export function listReviews(): Review[] {
  // Fallback to local storage for compatibility
  return read();
}

export async function listReviewsByProduct(productId: string): Promise<Review[]> {
  return (await fetchReviewsByProduct(productId)).sort((a, b) => b.createdAt - a.createdAt);
}

export function listReviewsByUser(userId: string): Review[] {
  // Fallback to local storage for user-specific reviews
  return read()
    .filter((r) => r.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function findReviewForOrderItem(key: ReviewKeyInput): Review | undefined {
  // Fallback to local storage for order-specific reviews
  return read().find((review) => matchesKey(review, key));
}

export function hasReviewForOrderItem(key: ReviewKeyInput): boolean {
  return findReviewForOrderItem(key) !== undefined;
}

export function createReview(input: CreateReviewInput): Review {
  const list = read();
  const existing = list.find((review) => matchesKey(review, input));
  if (existing) {
    return existing;
  }

  const normalizedRating = Math.min(5, Math.max(1, Math.round(input.rating)));
  const review: Review = {
    id: crypto.randomUUID(),
    userId: input.userId,
    orderId: input.orderId,
    productId: input.productId, // Use productId as provided
    productName: input.productName,
    rating: normalizedRating,
    comment: input.comment?.trim() ? input.comment.trim() : undefined,
    createdAt: Date.now(),
    size: input.size,
  };

  // Send review to API
  fetch(`${API_BASE_URL}/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: parseInt(input.userId, 10),
      product_id: input.productId, // Use productId, not productName
      stars: normalizedRating,
      text: input.comment?.trim() || undefined,
      time: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to create review: ${response.statusText}`);
      }
      // Update local storage only on successful API call
      list.push(review);
      write(list);
    })
    .catch((error) => {
      console.error("Error creating review:", error);
    });

  return review;
}