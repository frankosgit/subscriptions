import { User } from "../classes/User";

export interface AuthResponse {
    isAuthenticated: boolean,
    user: User | null,
    level?: number,
    isPaymentSuccess?: boolean,
    isActive?: boolean,
    isCancelling?: boolean
    orderDate?: string,
    activeUntil?: string,
    daysUntilPayment?: number
}