const express = require('express');

const {
    register,
    getUsers,
    getUserById,
    deleteUser,
    patchUser,
    issuingResetPasswordToken,
    login,
    logout,
    sendingResetEmail,
    resetPassword,
} = require('../controllers/Users');

const { auth } = require('../middleware/auth');
const router = express.Router();

router
    // users/
    .route('/')
    //유저 검색
    .get(getUsers)
    // auth 미들웨어로 req에 user 갖고있다면(로그인 돼있다면) 삭제가능
    .delete(auth, deleteUser)
    //회원 스스로 데이터 수정
    .patch(auth, patchUser)

    //회원가입
    .post(auth, register);

router
    .route('/:userId')
    //id값으로 특정 유저 검색
    .get(getUserById);
//id값으로 특정 유저 삭제 //관리자만
// .delete(deleteUser)
//id값으로 특정 유저 수정 // 관리자만
// .patch(patchUser);

router.route('/login').post(login);
// localhost:1337/users/logout  접근하면 왜  getUserById 여기 콘솔 3개가 다 찍힐까?
// router.route('/logout').get(logout);

//비밀번호 까먹었을 떄 이메일로 토큰 발급
router.route('/reset').post(sendingResetEmail);
//로그인 상태의 회원 리셋 토큰 발급
router.route('/patch').get(auth, issuingResetPasswordToken);
// 비밀번호 수정
router.route('/:resetPasswordToken').post(resetPassword);

module.exports = router;
