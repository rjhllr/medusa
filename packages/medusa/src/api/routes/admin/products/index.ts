import { Router } from "express"
import { Product, ProductTag, ProductType } from "../../../.."
import { DeleteResponse, PaginatedResponse } from "../../../../types/common"
import middlewares from "../../../middlewares"
import "reflect-metadata"

const route = Router()

export default (app) => {
  app.use("/products", route)

  route.post("/", middlewares.wrap(require("./create-product").default))
  route.post("/:id", middlewares.wrap(require("./update-product").default))
  route.get("/types", middlewares.wrap(require("./list-types").default))
  route.get(
    "/tag-usage",
    middlewares.wrap(require("./list-tag-usage-count").default)
  )

  route.post(
    "/:id/variants",
    middlewares.wrap(require("./create-variant").default)
  )

  route.post(
    "/:id/variants/:variant_id",
    middlewares.wrap(require("./update-variant").default)
  )

  route.post(
    "/:id/options/:option_id",
    middlewares.wrap(require("./update-option").default)
  )
  route.post("/:id/options", middlewares.wrap(require("./add-option").default))

  route.delete(
    "/:id/variants/:variant_id",
    middlewares.wrap(require("./delete-variant").default)
  )
  route.delete("/:id", middlewares.wrap(require("./delete-product").default))
  route.delete(
    "/:id/options/:option_id",
    middlewares.wrap(require("./delete-option").default)
  )

  route.post(
    "/:id/metadata",
    middlewares.wrap(require("./set-metadata").default)
  )

  route.get("/:id", middlewares.wrap(require("./get-product").default))
  route.get(
    "/",
    middlewares.normalizeQuery(),
    middlewares.wrap(require("./list-products").default)
  )

  return app
}

export const defaultAdminProductRelations = [
  "variants",
  "variants.prices",
  "variants.options",
  "images",
  "options",
  "tags",
  "type",
  "collection",
]

export const defaultAdminProductFields = [
  "id",
  "title",
  "subtitle",
  "description",
  "handle",
  "is_giftcard",
  "discountable",
  "thumbnail",
  "profile_id",
  "collection_id",
  "type_id",
  "weight",
  "length",
  "height",
  "width",
  "hs_code",
  "origin_country",
  "mid_code",
  "material",
  "created_at",
  "updated_at",
  "metadata",
]

export const allowedAdminProductFields = [
  "id",
  "title",
  "subtitle",
  "description",
  "handle",
  "is_giftcard",
  "discountable",
  "thumbnail",
  "profile_id",
  "collection_id",
  "type_id",
  "weight",
  "length",
  "height",
  "width",
  "hs_code",
  "origin_country",
  "mid_code",
  "material",
  "created_at",
  "updated_at",
  "metadata",
]

export const allowedAdminProductRelations = [
  "variants",
  "variants.prices",
  "images",
  "options",
  "tags",
  "type",
  "collection",
]

export type AdminProductsDeleteOptionRes = {
  option_id: string
  object: "option"
  deleted: boolean
  product: Product
}

export type AdminProductsDeleteVariantRes = {
  variant_id: string
  object: "product-variant"
  deleted: boolean
  product: Product
}

export type AdminProductsDeleteRes = {
  id: string
  object: "product"
  deleted: boolean
}

export type AdminProductsListRes = PaginatedResponse & {
  products: Product[]
}

export type AdminProductsListTypesRes = {
  types: ProductType[]
}

export type AdminProductsListTagsRes = {
  types: ProductTag[]
}

export type AdminProductsRes = {
  product: Product
}

export * from "./add-option"
export * from "./create-product"
export * from "./create-variant"
export * from "./delete-option"
export * from "./delete-product"
export * from "./delete-variant"
export * from "./get-product"
export * from "./get-variants"
export * from "./list-products"
export * from "./list-tag-usage-count"
export * from "./list-types"
export * from "./set-metadata"
export * from "./update-option"
export * from "./update-product"
export * from "./update-variant"
