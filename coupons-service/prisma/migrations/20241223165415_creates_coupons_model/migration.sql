-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "hash_code" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_hash_code_key" ON "Coupon"("hash_code");
