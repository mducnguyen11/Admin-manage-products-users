import './ProductsFilter.scss';
import { defaultFilterProductValue, IFilterProduct } from 'models/product';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import InputField from 'modules/common/components/InputField/InputField';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import { PRODUCT_AVAILABILITY_STATUS_OPTIONS, PRODUCT_STOCK_STATUS_OPTIONS } from 'modules/product/constants';
import Button from 'modules/common/components/Button/Button';
import FilterVendorForm from './components/FilterVendorForm';

interface Props {
  filter: IFilterProduct;
  onChange: Function;
}
const ProductFilter = (props: Props) => {
  const [filter, setFilter] = useState<IFilterProduct>(props.filter);
  const [expanded, setExpanded] = useState(true);
  const categories = useSelector((state: AppState) => state.categories.categories);
  const handleChangeCheckbox = (value: string) => {
    if (filter.search_type.split(',').includes(value)) {
      const xx = filter.search_type.split(',').filter((a) => a != value);
      let newSearchType = '';
      xx.forEach((a, i) => {
        if (i == 0) {
          newSearchType = newSearchType + a;
        } else {
          newSearchType = newSearchType + ',' + a;
        }
      });
      return setFilter({
        ...filter,
        search_type: newSearchType,
      });
    } else {
      if (filter.search_type == '') {
        return setFilter({
          ...filter,
          search_type: filter.search_type + value,
        });
      } else {
        return setFilter({
          ...filter,
          search_type: filter.search_type + ',' + value,
        });
      }
    }
  };
  const handleChangeFilter = (filterField: Object) => {
    setFilter({
      ...filter,
      ...filterField,
    });
  };

  return (
    <div className="filter">
      <div className="filter-main">
        <div className="filter-main-field">
          <InputField
            placeholder="Search Keyword"
            className="flex-1"
            type="text"
            onChange={(value: string) => {
              handleChangeFilter({
                search: value,
              });
            }}
            value={filter.search}
          />
        </div>
        <div className="filter-main-field">
          <SelectForm
            options={[
              {
                value: '0',
                name: 'Any category',
              },
              ...categories.map((a) => ({
                value: a.id,
                name: a.name,
              })),
            ]}
            onChange={(value: string) => {
              handleChangeFilter({
                category: value,
              });
            }}
            value={filter.category}
          />
        </div>
        <div className="filter-main-field">
          <SelectForm
            options={PRODUCT_STOCK_STATUS_OPTIONS}
            onChange={(value: string) => {
              handleChangeFilter({
                stock_status: value,
              });
            }}
            value={filter.stock_status}
          />
        </div>
        <Button
          onClick={() => {
            props.onChange(filter);
          }}
        >
          Search
        </Button>
      </div>
      <div className="filter-expand">
        <i
          onClick={() => {
            setExpanded(!expanded);
          }}
          className={expanded ? 'bx bxs-down-arrow' : 'bx bxs-up-arrow'}
        ></i>
      </div>
      {!expanded ? (
        <div className="filter-additional">
          <div className="filter-additional-listfield">
            <div className="filter-additional-field">
              <label>Search in</label>
              <div className="filter-field-input">
                <div className="filter-field-input-itm">
                  <input
                    onChange={() => {
                      handleChangeCheckbox('name');
                    }}
                    checked={filter.search_type.includes('name')}
                    type="checkbox"
                    name="name"
                  />{' '}
                  <label htmlFor="">Name</label>
                </div>
                <div className="filter-field-input-item">
                  <input
                    onChange={() => {
                      handleChangeCheckbox('sku');
                    }}
                    checked={filter.search_type.includes('sku')}
                    type="checkbox"
                    name="name"
                  />{' '}
                  <label htmlFor="">SKU</label>
                </div>
                <div className="filter-field-input-item">
                  <input
                    onChange={() => {
                      handleChangeCheckbox('description');
                    }}
                    checked={filter.search_type.includes('description')}
                    type="checkbox"
                    name="name"
                  />{' '}
                  <label htmlFor="">Full Description</label>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-additional-listfield">
            <div className="filter-additional-field">
              <label>Availability</label>
              <div className="filter-field-input">
                <SelectForm
                  options={PRODUCT_AVAILABILITY_STATUS_OPTIONS}
                  onChange={(value: string) => {
                    handleChangeFilter({
                      availability: value,
                    });
                  }}
                  value={filter.availability}
                />
              </div>
            </div>
          </div>
          <div className="filter-additional-listfield">
            <div className="filter-additional-field">
              <label>Vendor</label>
              <div className="filter-field-input">
                <FilterVendorForm value={filter.vendor} onChange={handleChangeFilter} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductFilter;
