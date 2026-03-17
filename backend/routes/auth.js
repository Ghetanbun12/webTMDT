import express, { Router } from "express";
import { body } from "express-validator";

import { regisUser, userLogin, createInforUser } from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import User from "../models/user.js";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyen Van A
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đã tồn tại
 */
router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên không được để trống"),
    body("email")
      .isEmail()
      .withMessage("Email không hợp lệ"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  ],
  regisUser
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công (trả về JWT)
 *       401:
 *         description: Sai email hoặc mật khẩu
 */
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Email không hợp lệ"),
    body("password")
      .notEmpty()
      .withMessage("Mật khẩu không được để trống"),
  ],
  userLogin
);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Lấy thông tin user từ token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token hợp lệ
 *       401:
 *         description: Token không hợp lệ
 */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.json({
      message: "Token hợp lệ",
      user: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: API chỉ dành cho admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Truy cập thành công
 *       403:
 *         description: Không có quyền
 */
router.get(
  "/admin",
  authMiddleware,
  checkRole(["admin"]),
  (req, res) => {
    res.json({
      message: "Chào admin 👑",
    });
  }
);
router.put(
  "/updateProfile",
  authMiddleware,
  createInforUser
);
export default router;
