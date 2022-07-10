import InputForm from 'modules/admin/components/InputField/InputField';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import React from 'react';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  paymentRailsId: string;
  paymentRailsType: string;
  onChange: Function;
  jonied: string;
  errors?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    [key: string]: any;
  };
}

const UserAccount = (props: Props) => {
  return (
    <div className="user-detail-section">
      <h2>{`Email & password`}</h2>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">First Name *</p>
        <div className="user-detail-row-value">
          <InputForm
            value={props.firstName}
            onChange={(a: string) => {
              console.log('change first name :', a);
              props.onChange({
                firstName: a,
              });
            }}
            error={props.errors?.firstName}
          />
        </div>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Last Name *</p>
        <div className="user-detail-row-value">
          <InputForm
            value={props.lastName}
            onChange={(a: string) => {
              props.onChange({
                lastName: a,
              });
            }}
            error={props.errors?.lastName}
          />
        </div>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Email *</p>
        <div className="user-detail-row-value">
          <InputForm
            value={props.email}
            onChange={(a: string) => {
              console.log('change first name :', a);
              props.onChange({
                email: a,
              });
            }}
            error={props.errors?.email}
          />
        </div>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Password</p>
        <div className="user-detail-row-value">
          <InputForm
            type="password"
            value=""
            onChange={(a: string) => {
              console.log('change first name :', a);
              props.onChange({
                password: a,
              });
            }}
            error={props.errors?.password}
          />
        </div>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Confirm Password</p>
        <div className="user-detail-row-value">
          <InputForm
            type="password"
            value=""
            onChange={(a: string) => {
              props.onChange({
                confirm_password: a,
              });
            }}
            error={props.errors?.confirm_password}
          />
        </div>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Type</p>
        {props.jonied ? (
          <p className="user-detail-row-value">{props.paymentRailsType}</p>
        ) : (
          <div className="user-detail-row-value">
            <SelectForm
              value={props.paymentRailsType}
              options={[
                {
                  id: 'individual',
                  name: 'Individual',
                },
                {
                  id: 'business',
                  name: 'Business',
                },
              ]}
              onChange={(a: string) => {
                props.onChange({
                  paymentRailsType: a,
                });
              }}
            />
          </div>
        )}
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">PaymentRails ID</p>
        <p className="user-detail-row-value">{props.paymentRailsId}</p>
      </div>
    </div>
  );
};

export default UserAccount;
