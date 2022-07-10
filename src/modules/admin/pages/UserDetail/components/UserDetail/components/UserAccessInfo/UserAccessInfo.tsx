import Checkbox from 'modules/admin/components/Checkbox/Checkbox';
import InputField from 'modules/admin/components/InputField/InputField';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import React from 'react';

interface Props {
  access_level: string;
  joined: string;
  status: string;
  statusComment: string;
  membership_id: string | null;
  pending_membership_id: string | null;
  forceChangePassword: string;
  onChange: Function;
}

const UserAccessInfo = (props: Props) => {
  return (
    <div className="user-detail-section">
      <h2>{`Access information`}</h2>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Access level</p>
        <div className="user-detail-row-value">
          {props.access_level && props.joined ? (
            <>{props.access_level == '10' ? 'Vendor' : `${props.access_level == '100' ? 'Admin' : ''}`}</>
          ) : (
            <>
              <SelectForm
                onChange={(a: string) => {
                  console.log(a);
                  props.onChange({
                    access_level: a,
                  });
                }}
                value={props.access_level}
                options={[
                  { id: '10', name: 'Vendor' },
                  {
                    id: '100',
                    name: 'Admin',
                  },
                ]}
              />
            </>
          )}
        </div>
      </div>
      {props.joined ? (
        <>
          {' '}
          <div className="user-detail-row-item">
            <p className="user-detail-row-name">Account status *</p>
            <div className="user-detail-row-value">
              <SelectForm
                value={props.status}
                options={[
                  { id: 'E', name: 'Enabled' },
                  { id: 'D', name: 'Disabled' },
                  { id: 'U', name: 'Unappoveed Vendor' },
                ]}
                onChange={(a: { status: string }) => {
                  props.onChange(a);
                }}
                key_name="status"
              />
            </div>
          </div>
          <div className="user-detail-row-item">
            <p className="user-detail-row-name">Status comment (reason)</p>
            <div className="user-detail-row-value">
              <InputField
                value={props.statusComment}
                onChange={(a: string) => {
                  props.onChange({
                    statusComment: a,
                  });
                }}
              />
            </div>
          </div>
        </>
      ) : null}
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Membership</p>
        <div className="user-detail-row-value">
          <SelectForm
            value={props.membership_id || ''}
            options={[
              { id: '4', name: 'General' },
              { id: '', name: 'Ignore Membersghip' },
            ]}
            onChange={(a: { membership_id: string }) => {
              props.onChange(a);
            }}
            key_name="membership_id"
          />
        </div>
      </div>
      {props.joined ? (
        <div className="user-detail-row-item">
          <p className="user-detail-row-name">Pending membership</p>
          <div className="user-detail-row-value">{props.pending_membership_id || 'none'}</div>
        </div>
      ) : null}
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Require to change password on next log in</p>
        <div className="user-detail-row-value">
          <Checkbox
            value={props.forceChangePassword == '1'}
            onChange={() => {
              if (props.forceChangePassword == '1') {
                props.onChange({
                  forceChangePassword: '0',
                });
              } else {
                props.onChange({
                  forceChangePassword: '1',
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserAccessInfo;
