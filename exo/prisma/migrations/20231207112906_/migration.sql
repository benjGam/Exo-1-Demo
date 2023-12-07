-- CreateTable
CREATE TABLE "Belong" (
    "product_UUID" CHAR(36) NOT NULL,
    "order_UUID" CHAR(36) NOT NULL,

    CONSTRAINT "Belong_pkey" PRIMARY KEY ("product_UUID","order_UUID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Belong_product_UUID_order_UUID_key" ON "Belong"("product_UUID", "order_UUID");
