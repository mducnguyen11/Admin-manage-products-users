import './UserFilter.scss';
import { IFilterUser } from 'models/user';
import React, { memo, useEffect, useState } from 'react';
import Country from './components/Country/Country';
import FilterUserTypes from './components/FilterUserTypes/FilterUserTypes';
import FilterDateRange from './components/DateRange/DateRange';
import InputField from 'modules/common/components/InputField/InputField';
import CheckmarksGroup from 'modules/common/components/CheckmarksGroup/CheckmarksGroup';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import Button from 'modules/common/components/Button/Button';
import RadioInput from 'modules/common/components/RadioInput/RadioInput';
import { USER_FILTER_MEMBERSHIPS_OPTIONS, USER_STATUS_OPTIONS } from 'modules/user/constants';

interface Props {
  filter: IFilterUser;
  onChange: Function;
}

const UserFilter = (props: Props) => {
  const [filter, setFilter] = useState<IFilterUser>(props.filter);
  const [expanded, setExpanded] = useState(true);
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
            key_name="search"
            placeholder="Search Keyword"
            className="flex-1"
            type="text"
            onChange={handleChangeFilter}
            value={filter.search}
          />
        </div>
        <div className="filter-main-field">
          <CheckmarksGroup
            placeholder="All membership"
            key_name="memberships"
            options={USER_FILTER_MEMBERSHIPS_OPTIONS}
            value={filter.memberships}
            onChange={handleChangeFilter}
          />
        </div>
        <div className="filter-main-field">
          <FilterUserTypes value={filter.types} onChange={handleChangeFilter} />
        </div>
        <div className="filter-main-field">
          <SelectForm
            key_name="status"
            value={filter.status[0] || 'All'}
            onChange={(a: { status: string }) => {
              handleChangeFilter({
                status: a.status == 'All' ? [] : [a.status],
              });
            }}
            options={USER_STATUS_OPTIONS}
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
              <label htmlFor="">Country</label>
              <div className="filter-field-input">
                <Country value={filter.country} onChange={handleChangeFilter} />
              </div>
            </div>
            <div className="filter-additional-field">
              <label htmlFor="">State</label>
              <div className="filter-field-input">
                <InputField key_name="state" onChange={handleChangeFilter} value={filter.state} />
              </div>
            </div>
            <div className="filter-additional-field">
              <label htmlFor="">Address</label>
              <div className="filter-field-input">
                <InputField key_name="address" onChange={handleChangeFilter} value={filter.address} />
              </div>
            </div>
            <div className="filter-additional-field">
              <label htmlFor="">Phone</label>
              <div className="filter-field-input">
                <InputField key_name="phone" onChange={handleChangeFilter} value={filter.phone} />
              </div>
            </div>
          </div>
          <div className="filter-additional-listfield">
            <div className="filter-additional-field">
              <label htmlFor="">User activity</label>
              <div className="filter-additional-field-radio-item">
                <RadioInput
                  value={filter.date_type}
                  onChange={handleChangeFilter}
                  options={[
                    { id: 'R', name: 'Register' },
                    {
                      id: 'L',
                      name: 'Last logged in',
                    },
                  ]}
                  key_name="date_type"
                />
              </div>
            </div>
            <div className="filter-additional-field">
              <label htmlFor=""></label>
              <FilterDateRange value={filter.date_range} onChange={handleChangeFilter} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo(UserFilter);
