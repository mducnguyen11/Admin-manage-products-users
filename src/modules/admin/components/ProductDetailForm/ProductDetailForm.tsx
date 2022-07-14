import './ProductDetailForm.scss';
import { IProductDetailData, IProductDetailDataField } from 'models/admin/product';
import React, { useEffect, useState } from 'react';
import { formatTimeStampToDate, validateProductDataField } from 'modules/admin/ultis';
import ProductBrand from './components/ProductBrand/ProductBrand';
import ProductCondition from './components/ProductCondition/ProductCondition';
import ProductImages from './components/ProductImages/ProductImages';
import ProductCategory from './components/ProductCategory/ProductCategory';
import ProductDescription from './components/ProductDescription/ProductDescription';
import ProductMemberships from './components/ProductMemberships/ProductMemberships';
import ProductTaxClass from './components/ProductTaxClass/ProductTaxClass';
import ProductPrice from './components/ProductPrice/ProductPrice';
import ProductArrivalDate from './components/ProductArrivalDate/ProductArrivalDate';
import ProductShipping from './components/ProductShipping/ProductShipping';
import ProductMetaTag from './components/ProductMetaTag/ProductMetaTag';
import ProductMetaDescType from './components/ProductMetaDescType/ProductMetaDescType';
import ProductInputSwitch from './components/ProductInputSwitch/ProductInputSwitch';
import Button from 'modules/admin/components/Button/Button';
import ProductInputRow from './components/ProductInputRow/ProductInputRow';
import ProductVendor from './components/ProductVendor/ProductVendor';

interface Props {
  product: IProductDetailData;
  actionName: string;
  onSave: (
    a: IProductDetailData,
    b: {
      image: string;
      file: any;
    }[],
  ) => void;
  listFieldRequired: string[];
}
interface ErrorData {
  vendor_id?: string;
  name?: string;
  brand_id?: string;
  condition?: string;
  images?: string;
  categories?: string;
  description?: string;
  price?: string;
  quantity?: string;
  shipping?: string;
}
const ProductDetailForm = (props: Props) => {
  const [productdetail, setProductdetail] = useState<IProductDetailData>(props.product);
  const [listImgUpload, setListImgUpload] = useState<
    {
      image: string;
      file: any;
    }[]
  >([]);
  const [errors, setErrors] = useState<ErrorData>({});
  const handleValidate = (productDataFieldChange: IProductDetailDataField, listFieldRequired: string[]) => {
    const validateResult: { validate: boolean; errors: { [key: string]: string } } = validateProductDataField(
      productDataFieldChange,
      listFieldRequired,
    );

    if (!validateResult.validate) {
      setErrors({
        ...errors,
        ...validateResult.errors,
      });
    } else {
      const newErrors = { ...errors };
      Object.keys(productDataFieldChange).forEach((field) => {
        if (Object.keys(errors).findIndex((fieldError) => fieldError == field) > -1) {
          delete newErrors[field as keyof typeof newErrors];
        }
      });
      setErrors(newErrors);
    }
  };
  const handleChangeProduct = (productDataFieldChange: IProductDetailDataField) => {
    handleValidate(productDataFieldChange, props.listFieldRequired);
    setProductdetail({
      ...productdetail,
      ...productDataFieldChange,
    });
  };
  const handleSaveProduct = async () => {
    const validateResult = validateProductDataField(productdetail, props.listFieldRequired);
    if (validateResult.validate) {
      props.onSave(productdetail, [...listImgUpload]);
      setListImgUpload([]);
    } else {
      setErrors(validateResult.errors);
    }
  };

  useEffect(() => {
    setProductdetail(props.product);
  }, [props.product]);

  const handleChangeImagesUpload = (
    newListImagesUpload: {
      image: string;
      file: {
        name: string;
        [key: string]: any;
      };
    }[],
  ) => {
    handleValidate(
      { images: productdetail.images, imagesOrder: [...newListImagesUpload.map((image): string => image.file.name)] },
      props.listFieldRequired,
    );
    setListImgUpload([...newListImagesUpload]);
    setProductdetail({
      ...productdetail,
      imagesOrder: [...newListImagesUpload.map((image): string => image.file.name)],
    });
  };
  return (
    <div className="product-detail">
      <div className="product-basic-detail">
        <ProductVendor errorMessage={errors.vendor_id} value={productdetail.vendor_id} onChange={handleChangeProduct} />
        <ProductInputRow
          errorMessage={errors.name}
          value={productdetail?.name}
          key_name="name"
          onChange={handleChangeProduct}
          text="Product Title"
        />
        <ProductBrand errorMessage={errors.brand_id} value={productdetail?.brand_id} onChange={handleChangeProduct} />
        <ProductCondition value={productdetail?.inventory_tracking} onChange={handleChangeProduct} />
        <ProductInputRow text="SKU" value={productdetail?.sku} onChange={handleChangeProduct} key_name="sku" />
        <ProductImages
          deleted_images={productdetail?.deleted_images !== undefined ? productdetail.deleted_images : []}
          onChange={handleChangeProduct}
          errorMessage={errors.images}
          listImagesCurrent={productdetail?.images || []}
          listImgUpload={listImgUpload}
          changeImagesUpload={handleChangeImagesUpload}
        />
        <ProductCategory
          errorMessage={errors.categories}
          value={[
            ...(productdetail?.categories.map((a) => {
              return {
                id: a.category_id,
                name: a.name,
              };
            }) || []),
          ]}
          onChange={handleChangeProduct}
        />
        <ProductDescription
          errorMessage={errors.description}
          onChange={handleChangeProduct}
          value={productdetail?.description}
        />
        <ProductInputSwitch
          key_name="enabled"
          onChange={handleChangeProduct}
          text="Available for sale"
          value={productdetail?.enabled}
          helperIcon={true}
        />
      </div>
      <div className="product-price-inventory">
        <h2 className="section-title">Price and Inventory</h2>
        <ProductMemberships value={productdetail?.memberships} onChange={handleChangeProduct} />
        <ProductTaxClass onChange={handleChangeProduct} value={productdetail?.tax_exempt} />
        <ProductPrice
          errorMessage={errors.price}
          price={productdetail?.price}
          onChange={handleChangeProduct}
          sale_price={productdetail?.sale_price}
          sale_price_type={productdetail?.sale_price_type}
        />
        <ProductArrivalDate value={formatTimeStampToDate(productdetail?.arrival_date)} onChange={handleChangeProduct} />
        <ProductInputRow
          key_name="quantity"
          text="Quantity in stock"
          errorMessage={errors.quantity}
          onChange={handleChangeProduct}
          value={productdetail?.quantity}
        />
      </div>
      <div className="product-shipping">
        <h2 className="section-title">Shipping</h2>
        <ProductShipping
          errorMessage={errors.shipping}
          continentalList={
            productdetail?.shipping.length > 0
              ? productdetail?.shipping
              : [{ id: '1', zone_name: 'Continental U.S.', price: '0.0000' }] || []
          }
          onChange={handleChangeProduct}
        />
      </div>
      <div className="product-maketing">
        <h2 className="section-title">Maketing</h2>
        <ProductMetaTag
          og_tags={productdetail.og_tags}
          value={productdetail?.og_tags_type}
          onChange={handleChangeProduct}
        />
        <ProductMetaDescType
          meta_description={productdetail.meta_description}
          value={productdetail?.meta_desc_type}
          onChange={handleChangeProduct}
        />
        <ProductInputRow
          key_name="meta_keywords"
          text="Meta keywords"
          value={productdetail?.meta_keywords}
          onChange={handleChangeProduct}
        />
        <ProductInputRow
          key_name="product_page_title"
          text="Product page title  "
          value={productdetail?.product_page_title}
          onChange={handleChangeProduct}
        />
      </div>
      <ProductInputSwitch
        key_name="facebook_marketing_enabled"
        onChange={handleChangeProduct}
        text="Add to Facebook product feed"
        value={productdetail?.facebook_marketing_enabled}
      />
      <ProductInputSwitch
        key_name="google_feed_enabled"
        onChange={handleChangeProduct}
        text="Add to Google product feed"
        value={productdetail?.google_feed_enabled}
      />
      <div className="product-detail-btn">
        <Button disabled={Object.keys(errors).length > 0} color="yellow" onClick={handleSaveProduct}>
          {props.actionName}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailForm;
