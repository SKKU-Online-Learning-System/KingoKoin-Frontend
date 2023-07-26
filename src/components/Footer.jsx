import logo from "../assets/main_logo_eng.png";

function Footer() {
  return (
    <div className="bg-onSurface text-surface p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 p-4">
          <img src={logo} alt="SKKU logo" className="h-12" />
          <span className="text-logo" style={{ whiteSpace: "nowrap" }}>
            킹고코인
          </span>
        </div>
        <div className="flex justify-end text-body">
          <a
            className="p-2"
            href="https://www.skku.edu/skku/etc/pop_email.do"
            target="_blank"
            rel="noreferrer"
          >
            이메일
          </a>
          <p className="p-2">|</p>
          <a
            className="p-2"
            href="https://www.skku.edu/skku/etc/pop_email.do"
            target="_blank"
            rel="noreferrer"
          >
            무료수집거부
          </a>
          <p className="p-2">|</p>
          <a
            className="p-2"
            href="https://www.skku.edu/skku/etc/private.do"
            target="_blank"
            rel="noreferrer"
          >
            개인정보처리방침
          </a>
        </div>
      </div>
      <div>
        <p className="text-surface p-4 text-body">
          성균관대학교 소프트웨어융합대학
          <br />
          경기도 수원시 장안구 서부로2066 성균관대학교 자연과학캠퍼스
          <br />
          소프트웨어융합대학 Copyrightⓒ2022 SUNGKYUNKWAN UNIVERSITY ALL RIGHTS
          RESERVED.
        </p>
      </div>
    </div>
  );
}

export default Footer;
