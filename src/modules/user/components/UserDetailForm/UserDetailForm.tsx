import './UserDetailForm.scss';
import { IUserDetailData, IUserDataField } from 'models/user';
import React, { useCallback, useEffect, useState } from 'react';
import UserTaxInfo from './components/UserTaxInfo/UserTaxInfo';
import UserRowInput from './components/UserRowInput/UserRowInput';
import UserPasswordForm from './components/UserPasswordForm/UserPasswordForm';
import UserType from './components/UserType/UserType';
import UserRowText from './components/UserRowText/UserRowText';
import { Link } from 'react-router-dom';
import UserStatus from './components/UserStatus/UserStatus';
import UserComment from './components/UserComment/UserComment';
import UserMemberships from './components/UserMemberships/UserMemberships';
import UserRequireChangePassword from './components/UserRequireChangePassword/UserRequireChangePassword';
import { USER_ACCESS_LEVEL_OPTIONS } from 'modules/user/constants';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import Button from 'modules/common/components/Button/Button';
import { formatTimeStampToDateString } from 'utils/formatTime';

interface Props {
  user: IUserDetailData;
  onSave: (a: IUserDetailData) => void;
  actionName?: string;
  onValidateUser: (value: IUserDataField) => {
    validate: boolean;
    errors: ErrorField;
  };
}
interface ErrorField {
  password?: string;
  confirm_password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
}

const UserDetailForm = (props: Props) => {
  const [user, setUser] = useState<IUserDetailData>(props.user);
  const [errors, setErrors] = useState<ErrorField>({});
  const handleValidate = useCallback(
    (fieldChange: IUserDataField): boolean => {
      const validateResult: {
        validate: boolean;
        errors: ErrorField;
      } = props.onValidateUser(fieldChange);
      if (!validateResult.validate) {
        setErrors({
          ...errors,
          ...validateResult.errors,
        });
        return false;
      } else {
        Object.keys(fieldChange).forEach((fieldChange) => {
          if (Object.keys(errors).findIndex((fieldError) => fieldError == fieldChange) > -1) {
            const newError = { ...errors };
            delete newError[fieldChange as keyof typeof newError];
            setErrors(newError);
          }
        });
        return true;
      }
    },
    [setErrors, errors],
  );
  const handleChangeUser = (userDataFieldChange: IUserDataField) => {
    console.log('change user :', userDataFieldChange);
    handleValidate(userDataFieldChange);
    setUser({
      ...user,
      ...userDataFieldChange,
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
              <UserRowText fieldName="Joined" value={formatTimeStampToDateString(user.joined)} />
              <UserRowText fieldName="Last login" value={formatTimeStampToDateString(user.last_login)} />
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
            <UserPasswordForm
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
              <UserRowText fieldName="Access level" value={user.access_level} options={USER_ACCESS_LEVEL_OPTIONS} />
            ) : (
              <>
                <div className="user-detail-row-item">
                  <p className="user-detail-row-name">Access level</p>
                  <div className="user-detail-row-value">
                    <>
                      <SelectForm
                        onChange={(value: string) => {
                          handleChangeUser({
                            access_level: value,
                          });
                        }}
                        value={user.access_level}
                        options={USER_ACCESS_LEVEL_OPTIONS}
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
                const xx = handleValidate(user);
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

export default UserDetailForm;
