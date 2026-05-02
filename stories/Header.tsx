import { Button } from "./Button";
import "./header.css";

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <div>
        <h1>
          <span className="">Acme</span>
        </h1>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="로그인" />
            <Button
              primary
              size="small"
              onClick={onCreateAccount}
              label="회원가입"
            />
          </>
        )}
      </div>
    </div>
  </header>
);
