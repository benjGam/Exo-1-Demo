-- CreateTable
CREATE TABLE "Products" (
    "UUID" CHAR(36) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pk" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Users" (
    "UUID" CHAR(36) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pk" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Orders" (
    "number" SERIAL NOT NULL,
    "total_cost" DOUBLE PRECISION NOT NULL,
    "total_product_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_UUID" CHAR(36) NOT NULL,

    CONSTRAINT "orders_pk" PRIMARY KEY ("number")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_UUID_key" ON "Products"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "Users_UUID_key" ON "Users"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_number_key" ON "Orders"("number");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "user_fk" FOREIGN KEY ("user_UUID") REFERENCES "Users"("UUID") ON DELETE CASCADE ON UPDATE CASCADE;
