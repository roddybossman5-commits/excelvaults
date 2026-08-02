import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';
import './AccountPage.scss';

/**
 * Post-login dashboard — issue 5 in Inbox/Raw Prompt Thoughts.
 *
 * Row order and labels come from Screenshots/Pasted image 20260730210048.png in
 * the Excel Vaults vault. The circled fields in that screenshot (first name, last
 * name, phone number, next of kin, balance) are the ones replaced with the values
 * from Inbox/2026-07-30-Excel Vaults Dump; the rest are carried over as-is.
 *
 * Values are seeded per-user from src/mocks/seedUsers.json.
 */
const ROWS = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'item', label: 'Item' },
  { key: 'dateOfDeposit', label: 'Date Of Deposit' },
  { key: 'phoneNumber', label: 'Phone Number', variant: 'link' },
  { key: 'serialNumber', label: 'Serial Number' },
  { key: 'country', label: 'Country' },
  { key: 'nextOfKin', label: 'Next Of Kin' },
  { key: 'notice', label: 'Notice', variant: 'notice' },
];

export default function AccountPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  console.log('[AccountPage] rendering dashboard for:', user?.username);

  return (
    <div className="account">
      <header className="account__bar">
        <img
          className="account__logo"
          src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
          alt="Excel Vaults"
        />
        <button type="button" className="account__logout" onClick={() => dispatch(logout())}>
          Log out
        </button>
      </header>

      <div className="account__card">
        <div className="account__avatar" aria-hidden="true">
          <span>👤</span>
        </div>

        <table className="account__table">
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                <td data-field={row.key} className={row.variant ? `is-${row.variant}` : undefined}>
                  {user?.[row.key] ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
