export interface Product {
    _id: string;
    product_name: string;
    product_img?: string;
    amount: number;
    price?: number;
    describe?: string;
    wishlist?: boolean;
    status?: boolean;
    checkedImport?: boolean;
    checkedExport?: boolean;
}
