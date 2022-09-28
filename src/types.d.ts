// signin api res interface
interface ISigninApiResData {
	_id?: string;
	user_name: string;
	user_email: string;
	user_role: boolean;
	user_pic: string;
	success: string;
	token: string | undefined;
}

// api user interface
interface IApiUser {
	_id?: string;
	user_name: string;
	user_email: string;
	user_password: string;
	user_role: boolean;
	user_pic: string;
}

// signup api response interface
interface ISignupApiRes {
	_id?: string;
	user_name: string;
	user_email: string;
	user_role: boolean;
	user_pic: string;
	success: string;
	token: string | undefined;
}

// signup api req interface
interface ISignupReq {
	user_name: string;
	user_email: string;
	user_password: string;
	user_role: boolean;
	user_pic: string;
}

// signup api user interface
interface ISignupApiUser {
	_id?: string;
	user_name: string;
	user_email: string;
	user_password: string;
	user_role: boolean;
	user_pic: string;
	success: string;
	token: string | undefined;
}

// one one chat interface
interface IOneOneChat {
	_id: string;
	chatName: string;
	createdAt: string;
	isGroupChat: boolean;
	updatedAt: string;
	groupAdmin?: ICUser;
	users: ICUser[];
	__v: number;
}

// new message interface
interface INewMessg {
	sender: string | undefined | string[];
	content: any;
	chat: string;
}
