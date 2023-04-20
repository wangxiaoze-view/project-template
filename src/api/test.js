import http from "../http/http.quest";

const testUrl = {
	testLogin: "xxxx",
};

export function testLogin(params) {
	return http.post(testUrl.testLogin, params);
}
