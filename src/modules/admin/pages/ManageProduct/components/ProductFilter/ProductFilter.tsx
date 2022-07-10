import { API_PATHS } from 'configs/api';
import { ICategoryItem, IFilterProduct } from 'models/admin/product';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import Button from 'modules/admin/components/Button/Button';
import { AVAILABILITY_STATUS, STOCK_STATUS } from './ultis';
import FilterVendorForm from './components/FilterVendorForm';
import InputField from 'modules/admin/components/InputField/InputField';

interface Props {
  filter: IFilterProduct;
  onChange: Function;
}

const ProductFilter = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [filter, setFilter] = useState<IFilterProduct>(props.filter);
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [expanded, setExpanded] = useState(true);
  const getCategories = async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getCategoriesList, 'get'));
    setCategories(res.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (JSON.stringify(props.filter) !== JSON.stringify(filter)) {
      console.log('!===');
      setFilter(props.filter);
    }
  }, [props.filter]);
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
  const handleChangeFilter = (a: Object) => {
    console.log(a);
    setFilter({
      ...filter,
      ...a,
    });
  };
  return (
    <div className="filter">
      <div className="filter-main">
        <div className="filter-main-field">
          <InputField
            key_name="search"
            placeholder="Search Keyword"
            className="flex-1"
            type="text"
            onChange={handleChangeFilter}
            value={filter.search}
          />
        </div>
        <div className="filter-main-field">
          <SelectForm
            options={[
              {
                id: '0',
                name: 'Any category',
                parentId: '',
                path: '',
                pos: '',
              },
              ...categories,
            ]}
            key_name="category"
            onChange={handleChangeFilter}
            value={filter.category}
          />
        </div>
        <div className="filter-main-field">
          <SelectForm
            options={STOCK_STATUS}
            key_name="stock_status"
            onChange={handleChangeFilter}
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
                  options={AVAILABILITY_STATUS}
                  key_name="availability"
                  onChange={handleChangeFilter}
                  value={filter.availability}
                />
              </div>
            </div>
          </div>
          <div className="filter-additional-listfield">
            <div className="filter-additional-field">
              <label>Vendor</label>
              <div className="filter-field-input">
                <FilterVendorForm value={filter.vendor} changeData={handleChangeFilter} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductFilter;
