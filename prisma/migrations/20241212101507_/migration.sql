-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('rate', 'amount');

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_organizations" (
    "item_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "discount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "discount_type" "DiscountType" NOT NULL DEFAULT 'rate',
    "tax" DECIMAL(3,2) NOT NULL DEFAULT 0,

    CONSTRAINT "item_organizations_pkey" PRIMARY KEY ("item_id","organization_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_name_key" ON "items"("name");

-- AddForeignKey
ALTER TABLE "item_organizations" ADD CONSTRAINT "item_organizations_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_organizations" ADD CONSTRAINT "item_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
