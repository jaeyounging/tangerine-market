import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    const baseUrl = "https://api.mandarin.weniv.co.kr";
    const reqeustPath = "/user/login";

    const loginData = {
      user: {
        email: email,
        password: password,
      },
    };

    // 로그인 해서 token 꺼내기
    const response = await fetch(baseUrl + reqeustPath, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginData), // http 요청은 문자열로 날라감
    }); // 뒤에 아무것도 적지 않으면 GET 요청

    const json = await response.json();
    const token = json.user.token;
    localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장

    // console.log(json);
    // console.log(token);
  };

  const inputEmail = (event) => {
    setEmail(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const submitLogin = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지
    login(email, password);
  };

  return (
    <div>
      <h1>로그인</h1>
      <section>
        <form onSubmit={submitLogin}>
          <input type="text" placeholder="이메일 입력" onChange={inputEmail} value={email} />
          <input
            type="password"
            placeholder="비밀번호 입력"
            onChange={inputPassword}
            value={password}
          />
          <button>로그인</button>
        </form>
      </section>
    </div>
  );
}
