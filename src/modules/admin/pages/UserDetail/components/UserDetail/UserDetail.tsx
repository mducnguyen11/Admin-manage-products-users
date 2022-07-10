import './user-detail.scss';
import { IUserDetailData, IUserDataField } from 'models/admin/user';
import Button from 'modules/admin/components/Button/Button';
import React, { useEffect, useState } from 'react';
import UserAccessInfo from './components/UserAccessInfo/UserAccessInfo';
import UserAccount from './components/UserAccount/UserAccount';
import UserActivity from './components/UserActivity/UserActivity';
import UserTaxInfo from './components/UserTaxInfo/UserTaxInfo';
import { validateUserData } from 'modules/admin/ultis';

interface Props {
  user: IUserDetailData;
  onSave: Function;
  listFieldRequired: string[];
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
  const handleValidate = (a: IUserDetailData, b: IUserDataField): boolean => {
    const tt = validateUserData(a, b, props.listFieldRequired);
    console.log('tttttt : ', tt);
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
  };
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
  console.log('redner ok');
  return (
    <div className="user-detail">
      {user ? (
        <>
          {user.joined ? (
            <>
              {
                <UserActivity
                  referer={user.referer}
                  products_total={user.products_total}
                  language={user.language}
                  last_login={user.last_login}
                  joined={user.joined}
                  earning={user.earning}
                  expense={user.expense}
                  income={user.income}
                  order_as_buyer={user.order_as_buyer}
                />
              }
            </>
          ) : null}
          <UserAccount
            jonied={user.joined}
            onChange={handleChangeUser}
            paymentRailsId={user.paymentRailsId}
            paymentRailsType={user.paymentRailsType}
            lastName={user.lastName}
            firstName={user.firstName}
            email={user.email}
            errors={{
              firstName: errors?.firstName,
              lastName: errors?.lastName,
              email: errors?.email,
              password: errors?.password,
              confirm_password: errors?.confirm_password,
            }}
          />
          <UserAccessInfo
            joined={user.joined}
            onChange={handleChangeUser}
            statusComment={user.statusComment}
            pending_membership_id={user.pending_membership_id}
            status={user.status}
            membership_id={user.membership_id}
            access_level={user.access_level}
            forceChangePassword={user.forceChangePassword}
          />
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
              Update User
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserDetail;
