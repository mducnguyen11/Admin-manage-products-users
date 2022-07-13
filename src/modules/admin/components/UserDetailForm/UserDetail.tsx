import './user-detail.scss';
import { IUserDetailData, IUserDataField } from 'models/admin/user';
import Button from 'modules/admin/components/Button/Button';
import React, { useCallback, useEffect, useState } from 'react';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import UserTaxInfo from './components/UserTaxInfo/UserTaxInfo';
import { ACCESS_LEVEL_OPTIONS, formatTimeStampToDate, validateUserData } from 'modules/admin/ultis';
import UserRowInput from './components/UserRowInput/UserRowInput';
import PasswordForm from './components/PasswordForm/PasswordForm';
import UserType from './components/UserType/UserType';
import UserRowText from './components/UserRowText/UserRowText';
import { Link } from 'react-router-dom';
import UserStatus from './components/UserStatus/UserStatus';
import UserComment from './components/UserComment/UserComment';
import UserMemberships from './components/UserMemberships/UserMemberships';
import UserRequireChangePassword from './components/UserRequireChangePassword/UserRequireChangePassword';

interface Props {
  user: IUserDetailData;
  onSave: (a: IUserDetailData) => void;
  listFieldRequired: string[];
  actionName?: string;
}

const UserDetail = (props: Props) => {
  const [user, setUser] = useState<IUserDetailData>(props.user);
  const [errors, setErrors] = useState<{
    password?: string;
    confirm_password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    status?: string;
  }>({});
  useEffect(() => {
    if (JSON.stringify(props.user) !== JSON.stringify(user)) {
      setUser(props.user);
    }
  }, [props.user]);
  const handleValidate = useCallback(
    (a: IUserDetailData, b: IUserDataField): boolean => {
      const tt = validateUserData(a, b, props.listFieldRequired);
      console.log(tt);
      if (!tt.validate) {
        setErrors({
          ...errors,
          ...tt.errors,
        });
        return false;
      } else {
        Object.keys(b).forEach((c) => {
          if (Object.keys(errors).findIndex((b) => b == c) > -1) {
            const xx = { ...errors };
            delete xx[c as keyof typeof xx];
            setErrors(xx);
          }
        });
        return true;
      }
    },
    [setErrors, props.listFieldRequired, errors],
  );
  const handleChangeUser = (a: IUserDataField) => {
    handleValidate(
      {
        ...user,
        ...a,
      },
      a,
    );
    setUser({
      ...user,
      ...a,
    });
  };

  return (
    <div className="user-detail">
      {user ? (
        <>
          {user.joined ? (
            <div className="user-detail-section">
              <UserRowText
                fieldName="Orders placed as a buyer"
                value={
                  <>
                    <Link to="/ahha">{user.order_as_buyer}</Link> {'($0.00)'}
                  </>
                }
              />
              <UserRowText fieldName="Vendor Income" value={'$' + user.income} />
              <UserRowText fieldName="Vendor Expense" value={'$' + user.expense} />
              <UserRowText fieldName="Earning balance" value={'$' + user.earning} />
              <UserRowText
                fieldName="Products listed as vendor"
                value={<Link to={'/okok'}>{user.products_total}</Link>}
              />
              <UserRowText fieldName="Joined" value={formatTimeStampToDate(user.joined)} />
              <UserRowText fieldName="Last login" value={formatTimeStampToDate(user.last_login)} />
              <UserRowText fieldName="Language" value={user.language} />
            </div>
          ) : null}
          <div className="user-detail-section">
            <UserRowInput
              value={user.firstName || ''}
              fieldName="First Name *"
              onChange={handleChangeUser}
              error={errors.firstName}
              key_name="firstName"
            />
            <UserRowInput
              value={user.lastName || ''}
              fieldName="Last Name *"
              onChange={handleChangeUser}
              error={errors.lastName}
              key_name="lastName"
            />
            <UserRowInput
              value={user.email}
              fieldName="Email *"
              onChange={handleChangeUser}
              error={errors.email}
              key_name="email"
            />
            <PasswordForm
              value={{
                password: user.password || '',
                confirm_password: user.confirm_password || '',
              }}
              onChange={handleChangeUser}
              errors={{ password: errors?.password, confirm_password: errors?.confirm_password }}
            />
            <UserType value={user.paymentRailsType} onChange={handleChangeUser} joined={user.joined} />
            <UserRowText value={user.paymentRailsId} fieldName="PaymentRails ID" />
          </div>
          <div className="user-detail-section">
            {user.joined ? (
              <UserRowText fieldName="Access level" value={user.access_level} options={ACCESS_LEVEL_OPTIONS} />
            ) : (
              <>
                <div className="user-detail-row-item">
                  <p className="user-detail-row-name">Access level</p>
                  <div className="user-detail-row-value">
                    <>
                      <SelectForm
                        onChange={handleChangeUser}
                        key_name="access_level"
                        value={user.access_level}
                        options={ACCESS_LEVEL_OPTIONS}
                      />
                    </>
                  </div>
                </div>
              </>
            )}
            {user.joined ? (
              <>
                <UserStatus value={user.status} onChange={handleChangeUser} />{' '}
                <UserComment onChange={handleChangeUser} value={user.statusComment} />
              </>
            ) : null}
            <UserMemberships value={user.membership_id || ''} onChange={handleChangeUser} />
            {user.joined ? (
              <UserRowText fieldName="Pending membership" value={user.pending_membership_id || 'none'} />
            ) : null}
            <UserRequireChangePassword value={user.forceChangePassword} onChange={handleChangeUser} />
          </div>
          <UserTaxInfo onChange={handleChangeUser} taxExempt={user.taxExempt} />
          <div className="user-detail-btns">
            <Button
              onClick={() => {
                const xx = handleValidate(user, user);
                if (xx) {
                  props.onSave(user);
                }
              }}
            >
              {props.actionName ? props.actionName : 'Update User'}
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserDetail;
