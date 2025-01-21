/*
 Navicat Premium Data Transfer

 Source Server         : TMOSIS
 Source Server Type    : MySQL
 Source Server Version : 80040
 Source Host           : localhost:3306
 Source Schema         : planeacionproduccion

 Target Server Type    : MySQL
 Target Server Version : 80040
 File Encoding         : 65001

 Date: 14/11/2024 08:10:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (1, 'SM8');
INSERT INTO `cliente` VALUES (2, 'FRITEC');
INSERT INTO `cliente` VALUES (3, 'BOSAL');
INSERT INTO `cliente` VALUES (4, 'PSW');
INSERT INTO `cliente` VALUES (5, 'PROCARGA');

-- ----------------------------
-- Table structure for detalle_pasos_pedido
-- ----------------------------
DROP TABLE IF EXISTS `detalle_pasos_pedido`;
CREATE TABLE `detalle_pasos_pedido`  (
  `id_detalle_pasos_pedido` int NOT NULL AUTO_INCREMENT,
  `id_detalle_pedido_producto` int NULL DEFAULT NULL,
  `id_ruta` int NULL DEFAULT NULL,
  `cantidad_terminada` int NULL DEFAULT NULL,
  `responsable_cambio` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_hora_cambio` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id_detalle_pasos_pedido`) USING BTREE,
  INDEX `id_detalle_pedido_producto_fk`(`id_detalle_pedido_producto`) USING BTREE,
  INDEX `id_ruta_fk`(`id_ruta`) USING BTREE,
  CONSTRAINT `id_detalle_pedido_producto_fk` FOREIGN KEY (`id_detalle_pedido_producto`) REFERENCES `detalle_pedido_producto` (`id_detalle_pedido_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_ruta_fk` FOREIGN KEY (`id_ruta`) REFERENCES `relacion_ruta` (`id_ruta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 620 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of detalle_pasos_pedido
-- ----------------------------
INSERT INTO `detalle_pasos_pedido` VALUES (461, 66, 1, 0, NULL, '2024-11-08 10:23:55');
INSERT INTO `detalle_pasos_pedido` VALUES (462, 66, 2, 0, NULL, '2024-11-08 10:23:55');
INSERT INTO `detalle_pasos_pedido` VALUES (463, 66, 3, 600, 'Fernando', '2024-11-11 10:13:39');
INSERT INTO `detalle_pasos_pedido` VALUES (464, 67, 1, 0, NULL, '2024-11-08 12:49:53');
INSERT INTO `detalle_pasos_pedido` VALUES (465, 67, 2, 0, NULL, '2024-11-08 12:49:53');
INSERT INTO `detalle_pasos_pedido` VALUES (466, 67, 3, 1000, 'Fernando', '2024-11-12 11:31:27');
INSERT INTO `detalle_pasos_pedido` VALUES (479, 69, 4, 0, 'Jhossymar', '2024-11-08 13:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (480, 69, 5, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (481, 69, 6, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (482, 69, 7, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (483, 69, 8, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (484, 69, 9, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (485, 69, 10, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (486, 69, 11, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (487, 69, 12, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (488, 69, 13, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (489, 69, 14, 0, NULL, '2024-11-08 12:50:55');
INSERT INTO `detalle_pasos_pedido` VALUES (490, 69, 15, 1000, 'Fernando', '2024-11-08 13:03:36');
INSERT INTO `detalle_pasos_pedido` VALUES (491, 70, 4, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (492, 70, 5, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (493, 70, 6, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (494, 70, 7, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (495, 70, 8, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (496, 70, 9, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (497, 70, 10, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (498, 70, 11, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (499, 70, 12, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (500, 70, 13, 0, NULL, '2024-11-08 13:07:22');
INSERT INTO `detalle_pasos_pedido` VALUES (501, 70, 14, 5, 'Fernando', '2024-11-08 16:04:29');
INSERT INTO `detalle_pasos_pedido` VALUES (502, 70, 15, 30, 'Jorge', '2024-11-08 15:34:51');
INSERT INTO `detalle_pasos_pedido` VALUES (503, 71, 1, 50, 'Fernando', '2024-11-12 11:27:56');
INSERT INTO `detalle_pasos_pedido` VALUES (504, 71, 2, 0, NULL, '2024-11-09 10:53:24');
INSERT INTO `detalle_pasos_pedido` VALUES (505, 71, 3, 0, NULL, '2024-11-09 10:53:24');
INSERT INTO `detalle_pasos_pedido` VALUES (506, 72, 4, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (507, 72, 5, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (508, 72, 6, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (509, 72, 7, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (510, 72, 8, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (511, 72, 9, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (512, 72, 10, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (513, 72, 11, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (514, 72, 12, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (515, 72, 13, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (516, 72, 14, 0, NULL, '2024-11-09 10:53:35');
INSERT INTO `detalle_pasos_pedido` VALUES (517, 72, 15, 200, 'Fernando', '2024-11-09 10:58:14');
INSERT INTO `detalle_pasos_pedido` VALUES (518, 73, 4, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (519, 73, 5, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (520, 73, 6, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (521, 73, 7, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (522, 73, 8, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (523, 73, 9, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (524, 73, 10, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (525, 73, 11, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (526, 73, 12, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (527, 73, 13, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (528, 73, 14, 0, NULL, '2024-11-09 10:53:43');
INSERT INTO `detalle_pasos_pedido` VALUES (529, 73, 15, 300, 'Jorge', '2024-11-09 10:55:44');
INSERT INTO `detalle_pasos_pedido` VALUES (530, 74, 4, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (531, 74, 5, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (532, 74, 6, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (533, 74, 7, 50, 'Fernando', '2024-11-11 14:45:03');
INSERT INTO `detalle_pasos_pedido` VALUES (534, 74, 8, 10, 'Jhossymar', '2024-11-11 16:24:52');
INSERT INTO `detalle_pasos_pedido` VALUES (535, 74, 9, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (536, 74, 10, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (537, 74, 11, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (538, 74, 12, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (539, 74, 13, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (540, 74, 14, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (541, 74, 15, 0, NULL, '2024-11-11 09:03:22');
INSERT INTO `detalle_pasos_pedido` VALUES (542, 75, 16, 0, NULL, '2024-11-11 10:52:48');
INSERT INTO `detalle_pasos_pedido` VALUES (543, 75, 17, 0, NULL, '2024-11-11 10:52:48');
INSERT INTO `detalle_pasos_pedido` VALUES (544, 75, 18, 0, NULL, '2024-11-11 10:52:48');
INSERT INTO `detalle_pasos_pedido` VALUES (545, 75, 19, 100, 'Fernando', '2024-11-13 16:21:21');
INSERT INTO `detalle_pasos_pedido` VALUES (546, 75, 20, 100, 'Fernando', '2024-11-13 16:23:55');
INSERT INTO `detalle_pasos_pedido` VALUES (547, 75, 21, 0, NULL, '2024-11-11 10:52:48');
INSERT INTO `detalle_pasos_pedido` VALUES (548, 75, 22, 0, NULL, '2024-11-11 10:52:48');
INSERT INTO `detalle_pasos_pedido` VALUES (549, 76, 16, 0, NULL, '2024-11-11 11:09:11');
INSERT INTO `detalle_pasos_pedido` VALUES (550, 76, 17, 0, NULL, '2024-11-11 11:09:11');
INSERT INTO `detalle_pasos_pedido` VALUES (551, 76, 18, 100, 'Fernando', '2024-11-11 14:47:02');
INSERT INTO `detalle_pasos_pedido` VALUES (552, 76, 19, 50, 'Fernando', '2024-11-11 15:56:01');
INSERT INTO `detalle_pasos_pedido` VALUES (553, 76, 20, -50, 'Fernando', '2024-11-13 16:04:01');
INSERT INTO `detalle_pasos_pedido` VALUES (554, 76, 21, 0, NULL, '2024-11-11 11:09:11');
INSERT INTO `detalle_pasos_pedido` VALUES (555, 76, 22, 300, 'Fernando', '2024-11-13 16:10:34');
INSERT INTO `detalle_pasos_pedido` VALUES (556, 77, 23, 0, NULL, '2024-11-11 11:09:15');
INSERT INTO `detalle_pasos_pedido` VALUES (557, 77, 24, 0, NULL, '2024-11-11 11:09:15');
INSERT INTO `detalle_pasos_pedido` VALUES (558, 77, 25, 50, 'Fernando', '2024-11-11 16:05:28');
INSERT INTO `detalle_pasos_pedido` VALUES (559, 77, 26, 10, 'Fernando', '2024-11-11 16:30:35');
INSERT INTO `detalle_pasos_pedido` VALUES (560, 77, 27, 0, NULL, '2024-11-11 11:09:15');
INSERT INTO `detalle_pasos_pedido` VALUES (561, 77, 28, 0, NULL, '2024-11-11 11:09:15');
INSERT INTO `detalle_pasos_pedido` VALUES (562, 77, 29, 300, 'Fernando', '2024-11-13 16:10:57');
INSERT INTO `detalle_pasos_pedido` VALUES (563, 78, 1, 0, NULL, '2024-11-11 11:09:54');
INSERT INTO `detalle_pasos_pedido` VALUES (564, 78, 2, 0, NULL, '2024-11-11 11:09:54');
INSERT INTO `detalle_pasos_pedido` VALUES (565, 78, 3, 301, 'Fernando', '2024-11-13 15:40:36');
INSERT INTO `detalle_pasos_pedido` VALUES (566, 79, 4, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (567, 79, 5, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (568, 79, 6, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (569, 79, 7, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (570, 79, 8, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (571, 79, 9, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (572, 79, 10, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (573, 79, 11, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (574, 79, 12, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (575, 79, 13, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (576, 79, 14, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (577, 79, 15, 0, NULL, '2024-11-11 11:10:00');
INSERT INTO `detalle_pasos_pedido` VALUES (578, 80, 16, 0, NULL, '2024-11-11 11:11:13');
INSERT INTO `detalle_pasos_pedido` VALUES (579, 80, 17, 0, NULL, '2024-11-11 11:11:13');
INSERT INTO `detalle_pasos_pedido` VALUES (580, 80, 18, 0, NULL, '2024-11-11 11:11:13');
INSERT INTO `detalle_pasos_pedido` VALUES (581, 80, 19, 0, NULL, '2024-11-11 11:11:13');
INSERT INTO `detalle_pasos_pedido` VALUES (582, 80, 20, 0, 'Jhossymar', '2024-11-12 09:00:46');
INSERT INTO `detalle_pasos_pedido` VALUES (583, 80, 21, 0, 'Fernando', '2024-11-12 09:00:52');
INSERT INTO `detalle_pasos_pedido` VALUES (584, 80, 22, 400, 'Jorge', '2024-11-12 09:01:03');
INSERT INTO `detalle_pasos_pedido` VALUES (585, 81, 23, 0, NULL, '2024-11-11 11:11:33');
INSERT INTO `detalle_pasos_pedido` VALUES (586, 81, 24, 0, NULL, '2024-11-11 11:11:33');
INSERT INTO `detalle_pasos_pedido` VALUES (587, 81, 25, 0, NULL, '2024-11-11 11:11:33');
INSERT INTO `detalle_pasos_pedido` VALUES (588, 81, 26, 0, NULL, '2024-11-11 11:11:33');
INSERT INTO `detalle_pasos_pedido` VALUES (589, 81, 27, 0, NULL, '2024-11-11 11:11:33');
INSERT INTO `detalle_pasos_pedido` VALUES (590, 81, 28, 0, 'Fernando', '2024-11-12 09:12:32');
INSERT INTO `detalle_pasos_pedido` VALUES (591, 81, 29, 400, 'Jorge', '2024-11-12 09:19:06');
INSERT INTO `detalle_pasos_pedido` VALUES (592, 82, 1, 50, 'Jhossymar', '2024-11-11 12:42:52');
INSERT INTO `detalle_pasos_pedido` VALUES (593, 82, 2, 50, 'Fernando', '2024-11-11 12:43:01');
INSERT INTO `detalle_pasos_pedido` VALUES (594, 82, 3, 100, 'Jorge', '2024-11-11 12:43:11');
INSERT INTO `detalle_pasos_pedido` VALUES (595, 83, 30, 0, 'Jhossymar', '2024-11-11 14:43:36');
INSERT INTO `detalle_pasos_pedido` VALUES (596, 83, 31, 300, 'Jorge', '2024-11-11 14:43:55');
INSERT INTO `detalle_pasos_pedido` VALUES (597, 84, 30, 0, 'Fernando', '2024-11-13 16:26:31');
INSERT INTO `detalle_pasos_pedido` VALUES (598, 84, 31, 1000, 'Fernando', '2024-11-12 09:58:32');
INSERT INTO `detalle_pasos_pedido` VALUES (599, 85, 16, 0, NULL, '2024-11-12 09:23:20');
INSERT INTO `detalle_pasos_pedido` VALUES (600, 85, 17, 200, 'Fernando', '2024-11-12 09:30:03');
INSERT INTO `detalle_pasos_pedido` VALUES (601, 85, 18, 0, NULL, '2024-11-12 09:23:20');
INSERT INTO `detalle_pasos_pedido` VALUES (602, 85, 19, 0, NULL, '2024-11-12 09:23:20');
INSERT INTO `detalle_pasos_pedido` VALUES (603, 85, 20, 0, NULL, '2024-11-12 09:23:20');
INSERT INTO `detalle_pasos_pedido` VALUES (604, 85, 21, 0, NULL, '2024-11-12 09:23:20');
INSERT INTO `detalle_pasos_pedido` VALUES (605, 85, 22, 500, 'Fernando', '2024-11-12 09:31:12');
INSERT INTO `detalle_pasos_pedido` VALUES (606, 86, 23, 0, NULL, '2024-11-12 09:23:21');
INSERT INTO `detalle_pasos_pedido` VALUES (607, 86, 24, 0, NULL, '2024-11-12 09:23:22');
INSERT INTO `detalle_pasos_pedido` VALUES (608, 86, 25, 30, 'Fernando', '2024-11-12 10:02:22');
INSERT INTO `detalle_pasos_pedido` VALUES (609, 86, 26, 0, NULL, '2024-11-12 09:23:22');
INSERT INTO `detalle_pasos_pedido` VALUES (610, 86, 27, 0, NULL, '2024-11-12 09:23:22');
INSERT INTO `detalle_pasos_pedido` VALUES (611, 86, 28, 0, NULL, '2024-11-12 09:23:22');
INSERT INTO `detalle_pasos_pedido` VALUES (612, 86, 29, 999, 'Fernando', '2024-11-12 10:02:54');
INSERT INTO `detalle_pasos_pedido` VALUES (613, 87, 23, 0, NULL, '2024-11-12 09:23:51');
INSERT INTO `detalle_pasos_pedido` VALUES (614, 87, 24, 0, NULL, '2024-11-12 09:23:51');
INSERT INTO `detalle_pasos_pedido` VALUES (615, 87, 25, 0, NULL, '2024-11-12 09:23:51');
INSERT INTO `detalle_pasos_pedido` VALUES (616, 87, 26, 0, NULL, '2024-11-12 09:23:51');
INSERT INTO `detalle_pasos_pedido` VALUES (617, 87, 27, 0, NULL, '2024-11-12 09:23:51');
INSERT INTO `detalle_pasos_pedido` VALUES (618, 87, 28, 0, NULL, '2024-11-12 09:23:51');
INSERT INTO `detalle_pasos_pedido` VALUES (619, 87, 29, 0, NULL, '2024-11-12 09:23:51');
INSERT INTO `detalle_pasos_pedido` VALUES (620, 88, 16, 0, NULL, '2024-11-13 16:08:31');
INSERT INTO `detalle_pasos_pedido` VALUES (621, 88, 17, 0, NULL, '2024-11-13 16:08:31');
INSERT INTO `detalle_pasos_pedido` VALUES (622, 88, 18, 0, NULL, '2024-11-13 16:08:31');
INSERT INTO `detalle_pasos_pedido` VALUES (623, 88, 19, 0, NULL, '2024-11-13 16:08:31');
INSERT INTO `detalle_pasos_pedido` VALUES (624, 88, 20, 0, NULL, '2024-11-13 16:08:31');
INSERT INTO `detalle_pasos_pedido` VALUES (625, 88, 21, 0, NULL, '2024-11-13 16:08:31');
INSERT INTO `detalle_pasos_pedido` VALUES (626, 88, 22, 0, NULL, '2024-11-13 16:08:31');
INSERT INTO `detalle_pasos_pedido` VALUES (627, 89, 23, 0, NULL, '2024-11-13 16:08:41');
INSERT INTO `detalle_pasos_pedido` VALUES (628, 89, 24, 0, NULL, '2024-11-13 16:08:41');
INSERT INTO `detalle_pasos_pedido` VALUES (629, 89, 25, 0, NULL, '2024-11-13 16:08:41');
INSERT INTO `detalle_pasos_pedido` VALUES (630, 89, 26, 0, NULL, '2024-11-13 16:08:41');
INSERT INTO `detalle_pasos_pedido` VALUES (631, 89, 27, 0, NULL, '2024-11-13 16:08:41');
INSERT INTO `detalle_pasos_pedido` VALUES (632, 89, 28, 0, NULL, '2024-11-13 16:08:41');
INSERT INTO `detalle_pasos_pedido` VALUES (633, 89, 29, 0, NULL, '2024-11-13 16:08:41');

-- ----------------------------
-- Table structure for detalle_pedido_producto
-- ----------------------------
DROP TABLE IF EXISTS `detalle_pedido_producto`;
CREATE TABLE `detalle_pedido_producto`  (
  `id_detalle_pedido_producto` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad_solicitada` int NULL DEFAULT NULL,
  `dimension` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status_pedido` int NULL DEFAULT NULL,
  `cantidad_finalizada` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_detalle_pedido_producto`) USING BTREE,
  INDEX `id_pedido_fk`(`id_pedido`) USING BTREE,
  INDEX `id_producto_fk_detalle`(`id_producto`) USING BTREE,
  CONSTRAINT `id_pedido_fk` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_producto_fk_detalle` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 88 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of detalle_pedido_producto
-- ----------------------------
INSERT INTO `detalle_pedido_producto` VALUES (66, 39, 1, 600, 'NA', 1, 600);
INSERT INTO `detalle_pedido_producto` VALUES (67, 40, 1, 10000, 'NA', 3, 1000);
INSERT INTO `detalle_pedido_producto` VALUES (69, 40, 2, 1000, '2.50', 1, 1000);
INSERT INTO `detalle_pedido_producto` VALUES (70, 40, 2, 30, '2', 1, 30);
INSERT INTO `detalle_pedido_producto` VALUES (71, 43, 1, 200, 'NA', 3, NULL);
INSERT INTO `detalle_pedido_producto` VALUES (72, 43, 2, 200, '2', 1, 200);
INSERT INTO `detalle_pedido_producto` VALUES (73, 43, 2, 300, '2.5', 1, 300);
INSERT INTO `detalle_pedido_producto` VALUES (74, 46, 2, 200, '2', 3, NULL);
INSERT INTO `detalle_pedido_producto` VALUES (75, 48, 3, 233, 'NA', 2, NULL);
INSERT INTO `detalle_pedido_producto` VALUES (76, 53, 3, 300, 'NA', 1, 300);
INSERT INTO `detalle_pedido_producto` VALUES (77, 53, 4, 300, 'NA', 1, 300);
INSERT INTO `detalle_pedido_producto` VALUES (78, 54, 1, 300, 'NA', 1, 301);
INSERT INTO `detalle_pedido_producto` VALUES (79, 54, 2, 300, '2', 2, NULL);
INSERT INTO `detalle_pedido_producto` VALUES (80, 55, 3, 400, 'NA', 1, 400);
INSERT INTO `detalle_pedido_producto` VALUES (81, 55, 4, 400, 'NA', 1, 400);
INSERT INTO `detalle_pedido_producto` VALUES (82, 56, 1, 300, 'NA', 3, 100);
INSERT INTO `detalle_pedido_producto` VALUES (83, 57, 5, 300, 'NA', 1, 300);
INSERT INTO `detalle_pedido_producto` VALUES (84, 58, 5, 1000, 'NA', 1, 1000);
INSERT INTO `detalle_pedido_producto` VALUES (85, 58, 3, 1000, 'NA', 3, 500);
INSERT INTO `detalle_pedido_producto` VALUES (86, 58, 4, 1000, 'NA', 3, 999);
INSERT INTO `detalle_pedido_producto` VALUES (87, 58, 4, 50, 'NA', 0, NULL);
INSERT INTO `detalle_pedido_producto` VALUES (88, 59, 3, 3000, 'NA', 0, NULL);
INSERT INTO `detalle_pedido_producto` VALUES (89, 59, 4, 3000, 'NA', 0, NULL);

-- ----------------------------
-- Table structure for historial_pasos
-- ----------------------------
DROP TABLE IF EXISTS `historial_pasos`;
CREATE TABLE `historial_pasos`  (
  `id_historial_pasos` int NOT NULL AUTO_INCREMENT,
  `id_detalle_pasos_pedido` int NULL DEFAULT NULL,
  `id_ruta` int NULL DEFAULT NULL,
  `cantidad_terminada` int NULL DEFAULT NULL,
  `responsable_cambio` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_hora_cambio` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id_historial_pasos`) USING BTREE,
  INDEX `detalle_pasos_historial_fk`(`id_detalle_pasos_pedido`) USING BTREE,
  CONSTRAINT `detalle_pasos_historial_fk` FOREIGN KEY (`id_detalle_pasos_pedido`) REFERENCES `detalle_pasos_pedido` (`id_detalle_pasos_pedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of historial_pasos
-- ----------------------------
INSERT INTO `historial_pasos` VALUES (1, 502, 15, 20, 'Jhossymar', '2024-11-08 15:34:19');
INSERT INTO `historial_pasos` VALUES (2, 502, 15, 30, 'Jorge', '2024-11-08 15:34:51');
INSERT INTO `historial_pasos` VALUES (3, 501, 14, 5, 'Jorge', '2024-11-08 15:54:18');
INSERT INTO `historial_pasos` VALUES (4, 501, 14, 5, 'Fernando', '2024-11-08 16:04:29');
INSERT INTO `historial_pasos` VALUES (5, 463, 3, 300, 'Fernando', '2024-11-08 16:37:38');
INSERT INTO `historial_pasos` VALUES (6, 463, 3, 300, 'Jhossymar', '2024-11-08 16:51:19');
INSERT INTO `historial_pasos` VALUES (7, 466, 3, 10001, 'Jhossymar', '2024-11-09 08:24:46');
INSERT INTO `historial_pasos` VALUES (8, 529, 15, 300, 'Jhossymar', '2024-11-09 10:54:51');
INSERT INTO `historial_pasos` VALUES (9, 529, 15, 300, 'Jorge', '2024-11-09 10:55:44');
INSERT INTO `historial_pasos` VALUES (10, 517, 15, 200, 'Fernando', '2024-11-09 10:58:14');
INSERT INTO `historial_pasos` VALUES (11, 463, 3, 600, 'Fernando', '2024-11-11 10:13:39');
INSERT INTO `historial_pasos` VALUES (12, 592, 1, 50, 'Jhossymar', '2024-11-11 12:42:52');
INSERT INTO `historial_pasos` VALUES (13, 593, 2, 50, 'Fernando', '2024-11-11 12:43:01');
INSERT INTO `historial_pasos` VALUES (14, 594, 3, 100, 'Jorge', '2024-11-11 12:43:11');
INSERT INTO `historial_pasos` VALUES (15, 595, 30, 10, 'Fernando', '2024-11-11 14:41:03');
INSERT INTO `historial_pasos` VALUES (16, 595, 30, 10, 'Fernando', '2024-11-11 14:41:17');
INSERT INTO `historial_pasos` VALUES (17, 595, 30, 10, 'Fernando', '2024-11-11 14:41:58');
INSERT INTO `historial_pasos` VALUES (18, 595, 30, 0, 'Jhossymar', '2024-11-11 14:43:36');
INSERT INTO `historial_pasos` VALUES (19, 596, 31, 300, 'Jorge', '2024-11-11 14:43:55');
INSERT INTO `historial_pasos` VALUES (20, 533, 7, 50, 'Fernando', '2024-11-11 14:45:03');
INSERT INTO `historial_pasos` VALUES (21, 551, 18, 100, 'Fernando', '2024-11-11 14:47:02');
INSERT INTO `historial_pasos` VALUES (22, 552, 19, 50, 'Fernando', '2024-11-11 15:56:01');
INSERT INTO `historial_pasos` VALUES (23, 558, 25, 50, 'Fernando', '2024-11-11 16:05:28');
INSERT INTO `historial_pasos` VALUES (24, 534, 8, 10, 'Jhossymar', '2024-11-11 16:24:52');
INSERT INTO `historial_pasos` VALUES (25, 553, 20, 10, 'Fernando', '2024-11-11 16:30:15');
INSERT INTO `historial_pasos` VALUES (26, 559, 26, 10, 'Fernando', '2024-11-11 16:30:35');
INSERT INTO `historial_pasos` VALUES (27, 590, 28, 10, 'Fernando', '2024-11-12 08:48:47');
INSERT INTO `historial_pasos` VALUES (28, 583, 21, 200, 'Fernando', '2024-11-12 08:50:09');
INSERT INTO `historial_pasos` VALUES (29, 582, 20, 100, 'Jhossymar', '2024-11-12 09:00:32');
INSERT INTO `historial_pasos` VALUES (30, 582, 20, 0, 'Jhossymar', '2024-11-12 09:00:46');
INSERT INTO `historial_pasos` VALUES (31, 583, 21, 0, 'Fernando', '2024-11-12 09:00:52');
INSERT INTO `historial_pasos` VALUES (32, 584, 22, 400, 'Jorge', '2024-11-12 09:01:03');
INSERT INTO `historial_pasos` VALUES (33, 590, 28, 0, 'Fernando', '2024-11-12 09:12:32');
INSERT INTO `historial_pasos` VALUES (34, 591, 29, 400, 'Jorge', '2024-11-12 09:12:55');
INSERT INTO `historial_pasos` VALUES (35, 591, 29, 300, 'Jorge', '2024-11-12 09:17:17');
INSERT INTO `historial_pasos` VALUES (36, 591, 29, 400, 'Jorge', '2024-11-12 09:17:41');
INSERT INTO `historial_pasos` VALUES (37, 591, 29, 300, 'Jorge', '2024-11-12 09:17:59');
INSERT INTO `historial_pasos` VALUES (38, 591, 29, 400, 'Jorge', '2024-11-12 09:19:06');
INSERT INTO `historial_pasos` VALUES (39, 598, 31, 1000, 'Fernando', '2024-11-12 09:27:27');
INSERT INTO `historial_pasos` VALUES (40, 597, 30, 500, 'Fernando', '2024-11-12 09:27:56');
INSERT INTO `historial_pasos` VALUES (41, 598, 31, 200, 'Fernando', '2024-11-12 09:28:26');
INSERT INTO `historial_pasos` VALUES (42, 597, 30, 600, 'Fernando', '2024-11-12 09:29:12');
INSERT INTO `historial_pasos` VALUES (43, 600, 17, 200, 'Fernando', '2024-11-12 09:30:03');
INSERT INTO `historial_pasos` VALUES (44, 597, 30, 400, 'Fernando', '2024-11-12 09:30:21');
INSERT INTO `historial_pasos` VALUES (45, 605, 22, 500, 'Fernando', '2024-11-12 09:31:12');
INSERT INTO `historial_pasos` VALUES (46, 598, 31, 1000, 'Fernando', '2024-11-12 09:39:41');
INSERT INTO `historial_pasos` VALUES (47, 598, 31, 999, 'Fernando', '2024-11-12 09:40:01');
INSERT INTO `historial_pasos` VALUES (48, 598, 31, 1000, 'Fernando', '2024-11-12 09:43:18');
INSERT INTO `historial_pasos` VALUES (49, 598, 31, 999, 'Fernando', '2024-11-12 09:46:39');
INSERT INTO `historial_pasos` VALUES (50, 598, 31, 100, 'Fernando', '2024-11-12 09:47:16');
INSERT INTO `historial_pasos` VALUES (51, 598, 31, 1000, 'Fernando', '2024-11-12 09:47:27');
INSERT INTO `historial_pasos` VALUES (52, 598, 31, 100, 'Fernando', '2024-11-12 09:47:39');
INSERT INTO `historial_pasos` VALUES (53, 598, 31, 1000, 'Fernando', '2024-11-12 09:52:36');
INSERT INTO `historial_pasos` VALUES (54, 598, 31, 100, 'Fernando', '2024-11-12 09:53:26');
INSERT INTO `historial_pasos` VALUES (55, 598, 31, 1000, 'Fernando', '2024-11-12 09:56:17');
INSERT INTO `historial_pasos` VALUES (56, 598, 31, 100, 'Fernando', '2024-11-12 09:56:26');
INSERT INTO `historial_pasos` VALUES (57, 598, 31, 1000, 'Fernando', '2024-11-12 09:58:32');
INSERT INTO `historial_pasos` VALUES (58, 608, 25, 100, 'Fernando', '2024-11-12 09:59:48');
INSERT INTO `historial_pasos` VALUES (59, 608, 25, 0, 'Fernando', '2024-11-12 10:00:40');
INSERT INTO `historial_pasos` VALUES (60, 612, 29, 1000, 'Fernando', '2024-11-12 10:00:54');
INSERT INTO `historial_pasos` VALUES (61, 612, 29, 999, 'Fernando', '2024-11-12 10:01:07');
INSERT INTO `historial_pasos` VALUES (62, 612, 29, 1000, 'Fernando', '2024-11-12 10:01:21');
INSERT INTO `historial_pasos` VALUES (63, 612, 29, 0, 'Fernando', '2024-11-12 10:02:01');
INSERT INTO `historial_pasos` VALUES (64, 608, 25, 30, 'Fernando', '2024-11-12 10:02:22');
INSERT INTO `historial_pasos` VALUES (65, 612, 29, 1000, 'Fernando', '2024-11-12 10:02:38');
INSERT INTO `historial_pasos` VALUES (66, 612, 29, 999, 'Fernando', '2024-11-12 10:02:54');
INSERT INTO `historial_pasos` VALUES (67, 503, 1, 50, 'Fernando', '2024-11-12 11:27:56');
INSERT INTO `historial_pasos` VALUES (68, 466, 3, 10000, 'Fernando', '2024-11-12 11:31:13');
INSERT INTO `historial_pasos` VALUES (69, 466, 3, 1000, 'Fernando', '2024-11-12 11:31:27');
INSERT INTO `historial_pasos` VALUES (70, 565, 3, 301, 'Fernando', '2024-11-13 15:40:36');
INSERT INTO `historial_pasos` VALUES (71, 553, 20, 20, 'Fernando', '2024-11-13 16:02:56');
INSERT INTO `historial_pasos` VALUES (72, 553, 20, -50, 'Fernando', '2024-11-13 16:04:01');
INSERT INTO `historial_pasos` VALUES (73, 555, 22, 300, 'Fernando', '2024-11-13 16:10:34');
INSERT INTO `historial_pasos` VALUES (74, 562, 29, 300, 'Fernando', '2024-11-13 16:10:57');
INSERT INTO `historial_pasos` VALUES (75, 545, 19, 100, 'Fernando', '2024-11-13 16:21:21');
INSERT INTO `historial_pasos` VALUES (76, 546, 20, 100, 'Fernando', '2024-11-13 16:23:55');
INSERT INTO `historial_pasos` VALUES (77, 597, 30, 0, 'Fernando', '2024-11-13 16:26:31');

-- ----------------------------
-- Table structure for pasos
-- ----------------------------
DROP TABLE IF EXISTS `pasos`;
CREATE TABLE `pasos`  (
  `id_paso` int NOT NULL AUTO_INCREMENT,
  `nombre_paso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_paso`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pasos
-- ----------------------------
INSERT INTO `pasos` VALUES (1, 'Corte de silueta y punzonado (cuerpo y lengüeta)');
INSERT INTO `pasos` VALUES (2, 'Doblez');
INSERT INTO `pasos` VALUES (3, 'Ensamble / remachado');
INSERT INTO `pasos` VALUES (4, 'Rolado Y Punteado De Lamina Para Tarima');
INSERT INTO `pasos` VALUES (5, 'Corte Silueta De Cabecera');
INSERT INTO `pasos` VALUES (6, 'Doblez de Cabecera');
INSERT INTO `pasos` VALUES (7, 'Corte De Tira Para Oreja');
INSERT INTO `pasos` VALUES (8, 'Doblez De Oreja');
INSERT INTO `pasos` VALUES (9, 'Soldadura De Oreja');
INSERT INTO `pasos` VALUES (10, 'Galvanizado En Caliente (Cabecera) ');
INSERT INTO `pasos` VALUES (11, 'Corte De Silueta (Seguro)');
INSERT INTO `pasos` VALUES (12, 'Galvanizado De Seguro');
INSERT INTO `pasos` VALUES (13, 'Ensamble/Troquelado De Seguro');
INSERT INTO `pasos` VALUES (14, 'Ensamble Y Soldadura De Cabecera A Tarima');
INSERT INTO `pasos` VALUES (15, 'Limpieza Y Retoque');
INSERT INTO `pasos` VALUES (16, ' Corte Silueta');
INSERT INTO `pasos` VALUES (17, 'Embutido');
INSERT INTO `pasos` VALUES (18, 'Punzonado');
INSERT INTO `pasos` VALUES (19, 'Soldadura de Pieza (Union de perno a pieza)');
INSERT INTO `pasos` VALUES (20, 'Cardeado de Soldadura');
INSERT INTO `pasos` VALUES (21, 'Acabado Superficial');
INSERT INTO `pasos` VALUES (22, 'Empaque');
INSERT INTO `pasos` VALUES (23, 'Formado');

-- ----------------------------
-- Table structure for pedido
-- ----------------------------
DROP TABLE IF EXISTS `pedido`;
CREATE TABLE `pedido`  (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `folio` int NOT NULL,
  `id_cliente` int NOT NULL,
  `fecha_solicitud` date NOT NULL,
  `fecha_entrega` date NULL DEFAULT NULL,
  PRIMARY KEY (`id_pedido`) USING BTREE,
  INDEX `id_cliente_fk`(`id_cliente`) USING BTREE,
  CONSTRAINT `id_cliente_fk` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pedido
-- ----------------------------
INSERT INTO `pedido` VALUES (39, 1, 1, '2024-11-07', '2024-11-10');
INSERT INTO `pedido` VALUES (40, 5, 1, '2024-11-08', '2024-11-09');
INSERT INTO `pedido` VALUES (43, 22, 1, '2024-11-08', '2024-11-14');
INSERT INTO `pedido` VALUES (46, 6, 1, '2024-11-11', '2024-11-12');
INSERT INTO `pedido` VALUES (48, 11, 4, '2024-11-11', '2024-11-13');
INSERT INTO `pedido` VALUES (53, 58, 4, '2024-11-18', '2024-11-12');
INSERT INTO `pedido` VALUES (54, 57, 1, '2024-11-12', '2024-11-14');
INSERT INTO `pedido` VALUES (55, 57, 4, '2024-11-11', '2024-11-12');
INSERT INTO `pedido` VALUES (56, 57, 1, '2025-01-01', '2025-01-06');
INSERT INTO `pedido` VALUES (57, 60, 4, '2024-11-11', '2024-11-13');
INSERT INTO `pedido` VALUES (58, 1, 4, '2024-11-12', '2024-11-14');
INSERT INTO `pedido` VALUES (59, 58, 4, '2025-01-13', '2025-01-15');

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_producto`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (1, 'Aldabilla Completa');
INSERT INTO `producto` VALUES (2, 'Tarima Metálica');
INSERT INTO `producto` VALUES (3, 'Bracket LH');
INSERT INTO `producto` VALUES (4, 'Bracket RH');
INSERT INTO `producto` VALUES (5, 'Steel Fan Protector');

-- ----------------------------
-- Table structure for relacion_producto_cliente
-- ----------------------------
DROP TABLE IF EXISTS `relacion_producto_cliente`;
CREATE TABLE `relacion_producto_cliente`  (
  `id_cliente_producto` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NULL DEFAULT NULL,
  `id_producto` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente_producto`) USING BTREE,
  INDEX `id_clienteproducto_fk`(`id_cliente`) USING BTREE,
  INDEX `id_producto_client_fk`(`id_producto`) USING BTREE,
  CONSTRAINT `id_clienteproducto_fk` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_producto_client_fk` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of relacion_producto_cliente
-- ----------------------------
INSERT INTO `relacion_producto_cliente` VALUES (1, 1, 1);
INSERT INTO `relacion_producto_cliente` VALUES (2, 1, 2);
INSERT INTO `relacion_producto_cliente` VALUES (3, 4, 3);
INSERT INTO `relacion_producto_cliente` VALUES (4, 4, 4);
INSERT INTO `relacion_producto_cliente` VALUES (5, 4, 5);

-- ----------------------------
-- Table structure for relacion_ruta
-- ----------------------------
DROP TABLE IF EXISTS `relacion_ruta`;
CREATE TABLE `relacion_ruta`  (
  `id_ruta` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NULL DEFAULT NULL,
  `id_paso` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_ruta`) USING BTREE,
  INDEX `id_producto_relacion_fk`(`id_producto`) USING BTREE,
  INDEX `id_paso_relacion_fk`(`id_paso`) USING BTREE,
  CONSTRAINT `id_paso_relacion_fk` FOREIGN KEY (`id_paso`) REFERENCES `pasos` (`id_paso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_producto_relacion_fk` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of relacion_ruta
-- ----------------------------
INSERT INTO `relacion_ruta` VALUES (1, 1, 1);
INSERT INTO `relacion_ruta` VALUES (2, 1, 2);
INSERT INTO `relacion_ruta` VALUES (3, 1, 3);
INSERT INTO `relacion_ruta` VALUES (4, 2, 4);
INSERT INTO `relacion_ruta` VALUES (5, 2, 5);
INSERT INTO `relacion_ruta` VALUES (6, 2, 6);
INSERT INTO `relacion_ruta` VALUES (7, 2, 7);
INSERT INTO `relacion_ruta` VALUES (8, 2, 8);
INSERT INTO `relacion_ruta` VALUES (9, 2, 9);
INSERT INTO `relacion_ruta` VALUES (10, 2, 10);
INSERT INTO `relacion_ruta` VALUES (11, 2, 11);
INSERT INTO `relacion_ruta` VALUES (12, 2, 12);
INSERT INTO `relacion_ruta` VALUES (13, 2, 13);
INSERT INTO `relacion_ruta` VALUES (14, 2, 14);
INSERT INTO `relacion_ruta` VALUES (15, 2, 15);
INSERT INTO `relacion_ruta` VALUES (16, 3, 16);
INSERT INTO `relacion_ruta` VALUES (17, 3, 17);
INSERT INTO `relacion_ruta` VALUES (18, 3, 18);
INSERT INTO `relacion_ruta` VALUES (19, 3, 19);
INSERT INTO `relacion_ruta` VALUES (20, 3, 20);
INSERT INTO `relacion_ruta` VALUES (21, 3, 21);
INSERT INTO `relacion_ruta` VALUES (22, 3, 22);
INSERT INTO `relacion_ruta` VALUES (23, 4, 16);
INSERT INTO `relacion_ruta` VALUES (24, 4, 17);
INSERT INTO `relacion_ruta` VALUES (25, 4, 18);
INSERT INTO `relacion_ruta` VALUES (26, 4, 19);
INSERT INTO `relacion_ruta` VALUES (27, 4, 20);
INSERT INTO `relacion_ruta` VALUES (28, 4, 21);
INSERT INTO `relacion_ruta` VALUES (29, 4, 22);
INSERT INTO `relacion_ruta` VALUES (30, 5, 16);
INSERT INTO `relacion_ruta` VALUES (31, 5, 23);

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `area` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `codigo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 'Fernando', 'cfernando@gmail.com', '1234567', 'Planeacion', '252608');
INSERT INTO `usuarios` VALUES (2, 'Jhossymar', 'jhossymar@gmail.com', '8901234', 'Ingenieria', '454749');
INSERT INTO `usuarios` VALUES (3, 'Jorge', 'jorge@gmail.com', '2345679', 'Produccion', '678901');

-- ----------------------------
-- Procedure structure for ActualizarDetallePasosPedido
-- ----------------------------
DROP PROCEDURE IF EXISTS `ActualizarDetallePasosPedido`;
delimiter ;;
CREATE PROCEDURE `ActualizarDetallePasosPedido`(IN p_id_detalle_pasos_pedido INT,
    IN p_cantidad_terminada INT,
    IN p_codigo_usuario VARCHAR(255))
BEGIN
    -- Declarar las variables para almacenar los valores necesarios
    DECLARE v_id_detalle_pedido_producto INT;
    DECLARE v_id_producto INT;
    DECLARE v_id_paso_actual INT;
    DECLARE v_ultimo_paso INT;
    DECLARE v_responsable_cambio VARCHAR(50);
    DECLARE v_id_ruta INT;
    DECLARE v_status_pedido INT;

    -- Obtener el nombre del usuario basado en el código proporcionado
    SELECT nombre
    INTO v_responsable_cambio
    FROM usuarios
    WHERE codigo = p_codigo_usuario;

    -- Si no se encuentra un usuario con ese código, devolver un mensaje de error
    IF v_responsable_cambio IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Código de usuario no encontrado';
    END IF;

    -- Obtener el id_detalle_pedido_producto, el id_paso actual, el id_producto, y el id_ruta
    SELECT dpp.id_detalle_pedido_producto, rr.id_paso, rr.id_producto, dpp.id_ruta
    INTO v_id_detalle_pedido_producto, v_id_paso_actual, v_id_producto, v_id_ruta
    FROM detalle_pasos_pedido dpp
    JOIN relacion_ruta rr ON dpp.id_ruta = rr.id_ruta
    WHERE dpp.id_detalle_pasos_pedido = p_id_detalle_pasos_pedido;

    -- Obtener el valor actual de status_pedido
    SELECT status_pedido
    INTO v_status_pedido
    FROM detalle_pedido_producto
    WHERE id_detalle_pedido_producto = v_id_detalle_pedido_producto;

    -- Actualizamos la tabla detalle_pasos_pedido con la nueva cantidad_terminada, responsable_cambio y fecha_hora_cambio
    UPDATE detalle_pasos_pedido
    SET 
        cantidad_terminada = p_cantidad_terminada,
        responsable_cambio = v_responsable_cambio,
        fecha_hora_cambio = CURRENT_TIMESTAMP
    WHERE 
        id_detalle_pasos_pedido = p_id_detalle_pasos_pedido;

    -- Insertar un nuevo registro en historial_pasos
    INSERT INTO historial_pasos (id_detalle_pasos_pedido, id_ruta, cantidad_terminada, responsable_cambio, fecha_hora_cambio)
    VALUES (p_id_detalle_pasos_pedido, v_id_ruta, p_cantidad_terminada, v_responsable_cambio, CURRENT_TIMESTAMP);

    -- Obtener el último paso de la ruta asociada al producto
    SELECT MAX(rr.id_paso)
    INTO v_ultimo_paso
    FROM relacion_ruta rr
    WHERE rr.id_producto = v_id_producto;

    -- Verificar si el paso actual es el último paso
    IF v_id_paso_actual = v_ultimo_paso THEN
        -- Si es el último paso, actualizar cantidad_finalizada en la tabla detalle_pedido_producto
        UPDATE detalle_pedido_producto
        SET cantidad_finalizada = p_cantidad_terminada
        WHERE id_detalle_pedido_producto = v_id_detalle_pedido_producto;
    ELSE
        -- Si no es el último paso, verificar el valor de status_pedido y la cantidad terminada
        IF v_status_pedido = 0 AND p_cantidad_terminada > 0 THEN
            -- Si status_pedido es 0 y la cantidad terminada es mayor a cero, actualizar a 3
            UPDATE detalle_pedido_producto
            SET status_pedido = 3
            WHERE id_detalle_pedido_producto = v_id_detalle_pedido_producto;
        END IF;
    END IF;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ActualizarFechasPedido
-- ----------------------------
DROP PROCEDURE IF EXISTS `ActualizarFechasPedido`;
delimiter ;;
CREATE PROCEDURE `ActualizarFechasPedido`(IN p_id_pedido INT,
    IN p_fecha_solicitud DATE,
    IN p_fecha_entrega DATE)
BEGIN
    UPDATE pedido
    SET fecha_solicitud = p_fecha_solicitud,
        fecha_entrega = p_fecha_entrega
    WHERE id_pedido = p_id_pedido;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for EditarCantidadYStatus
-- ----------------------------
DROP PROCEDURE IF EXISTS `EditarCantidadYStatus`;
delimiter ;;
CREATE PROCEDURE `EditarCantidadYStatus`(IN p_id_detalle_pedido_producto INT,
    IN p_cantidad_solicitada INT,
    IN p_status_pedido INT)
BEGIN
    UPDATE detalle_pedido_producto
    SET cantidad_solicitada = p_cantidad_solicitada,
        status_pedido = p_status_pedido
    WHERE id_detalle_pedido_producto = p_id_detalle_pedido_producto;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for EliminarDetallePedidoProducto
-- ----------------------------
DROP PROCEDURE IF EXISTS `EliminarDetallePedidoProducto`;
delimiter ;;
CREATE PROCEDURE `EliminarDetallePedidoProducto`(IN p_id_detalle_pedido_producto INT)
BEGIN
    -- Iniciar transacción
    START TRANSACTION;

    -- Eliminar de detalle_pasos_pedido
    DELETE FROM detalle_pasos_pedido
    WHERE id_detalle_pedido_producto = p_id_detalle_pedido_producto;

    -- Eliminar de detalle_pedido_producto
    DELETE FROM detalle_pedido_producto
    WHERE id_detalle_pedido_producto = p_id_detalle_pedido_producto;

    -- Confirmar los cambios
    COMMIT;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for EliminarPedido
-- ----------------------------
DROP PROCEDURE IF EXISTS `EliminarPedido`;
delimiter ;;
CREATE PROCEDURE `EliminarPedido`(IN p_id_pedido INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_id_detalle_pedido_producto INT;
    DECLARE cur CURSOR FOR 
        SELECT id_detalle_pedido_producto
        FROM detalle_pedido_producto
        WHERE id_pedido = p_id_pedido;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Iniciar transacción
    START TRANSACTION;

    -- Abrir cursor
    OPEN cur;

    -- Bucle para eliminar detalles de productos
    read_loop: LOOP
        FETCH cur INTO v_id_detalle_pedido_producto;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Eliminar de detalle_pasos_pedido
        DELETE FROM detalle_pasos_pedido
        WHERE id_detalle_pedido_producto = v_id_detalle_pedido_producto;

        -- Eliminar de detalle_pedido_producto
        DELETE FROM detalle_pedido_producto
        WHERE id_detalle_pedido_producto = v_id_detalle_pedido_producto;
    END LOOP;

    -- Cerrar cursor
    CLOSE cur;

    -- Eliminar de pedido
    DELETE FROM pedido
    WHERE id_pedido = p_id_pedido;

    -- Confirmar los cambios
    COMMIT;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for InsertarDetallePedido
-- ----------------------------
DROP PROCEDURE IF EXISTS `InsertarDetallePedido`;
delimiter ;;
CREATE PROCEDURE `InsertarDetallePedido`(IN p_id_pedido INT,
    IN p_nombre_producto VARCHAR(255),  -- Cambiado a nombre_producto
    IN p_cantidad_solicitada INT,
    IN p_dimension VARCHAR(255))
BEGIN
    DECLARE v_id_detalle_pedido_producto INT;
    DECLARE v_id_producto INT;  -- Declaración del id_producto obtenido
    DECLARE v_id_ruta INT;
    DECLARE done INT DEFAULT 0;

    -- Declaración del cursor y manejador de fin de datos
    DECLARE paso_cursor CURSOR FOR
        SELECT id_ruta FROM relacion_ruta WHERE id_producto = v_id_producto;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Obtener el id_producto a partir del nombre_producto
    SELECT id_producto INTO v_id_producto
    FROM producto
    WHERE nombre_producto = p_nombre_producto
    LIMIT 1;

    -- Insertar en detalle_pedido_producto con el campo status_pedido como 0
    INSERT INTO detalle_pedido_producto (id_pedido, id_producto, cantidad_solicitada, dimension, status_pedido)
    VALUES (p_id_pedido, v_id_producto, p_cantidad_solicitada, p_dimension, 0);

    -- Obtener el ID del detalle recién insertado
    SET v_id_detalle_pedido_producto = LAST_INSERT_ID();

    -- Abrir el cursor
    OPEN paso_cursor;

    -- Bucle para iterar sobre cada paso asociado con el producto
    read_loop: LOOP
        FETCH paso_cursor INTO v_id_ruta;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insertar en detalle_pasos_pedido
        INSERT INTO detalle_pasos_pedido (id_detalle_pedido_producto, id_ruta, cantidad_terminada, fecha_hora_cambio)
        VALUES (v_id_detalle_pedido_producto, v_id_ruta, 0, NOW());
    END LOOP;

    -- Cerrar el cursor
    CLOSE paso_cursor;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for InsertarPedido
-- ----------------------------
DROP PROCEDURE IF EXISTS `InsertarPedido`;
delimiter ;;
CREATE PROCEDURE `InsertarPedido`(IN p_folio INT,
    IN p_nombre_cliente VARCHAR(255),
    IN p_fecha_solicitud DATE,
    IN p_fecha_entrega DATE,
    OUT p_id_pedido INT)
BEGIN
    DECLARE v_id_cliente INT;
    DECLARE v_count INT;

    -- Buscar el id_cliente según el nombre del cliente
    SELECT id_cliente INTO v_id_cliente
    FROM cliente
    WHERE nombre_cliente = p_nombre_cliente;

    -- Verificar si el cliente existe
    IF v_id_cliente IS NOT NULL THEN
        -- Comprobar si el folio ya existe para el mismo cliente en el mismo año
        SELECT COUNT(*)
        INTO v_count
        FROM pedido
        WHERE folio = p_folio
          AND id_cliente = v_id_cliente
          AND YEAR(fecha_solicitud) = YEAR(p_fecha_solicitud);

        -- Si el folio ya existe con el mismo cliente en el mismo año, lanzar un error
        IF v_count > 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El folio ya existe para este cliente en el mismo año';
        ELSE
            -- Insertar en la tabla pedido con los datos proporcionados
            INSERT INTO pedido (folio, id_cliente, fecha_solicitud, fecha_entrega)
            VALUES (p_folio, v_id_cliente, p_fecha_solicitud, p_fecha_entrega);

            -- Obtener el id_pedido generado
            SET p_id_pedido = LAST_INSERT_ID();  -- Asignar el último ID insertado a la variable de salida
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000'  -- Lanzar un error si el cliente no existe
        SET MESSAGE_TEXT = 'Cliente no encontrado';
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for mostrar_pedidos
-- ----------------------------
DROP PROCEDURE IF EXISTS `mostrar_pedidos`;
delimiter ;;
CREATE PROCEDURE `mostrar_pedidos`()
BEGIN
    SELECT 
        pedido.id_pedido,
        pedido.folio,
        cliente.id_cliente AS id_cliente,               -- Incluir id_cliente
        cliente.nombre_cliente AS nombre_cliente,       -- Agregar nombre del cliente
        DATE_FORMAT(pedido.fecha_solicitud, '%d/%m/%Y') AS fecha_solicitud_formateada, -- Fecha con formato
        pedido.fecha_solicitud AS fecha_solicitud_formato, -- Fecha sin formato
        DATE_FORMAT(pedido.fecha_entrega, '%d/%m/%Y') AS fecha_entrega_formateada, -- Fecha con formato
        pedido.fecha_entrega AS fecha_entrega_formato, -- Fecha sin formato
        CASE 
            WHEN SUM(detalle_pedido_producto.status_pedido = 2) > 0 THEN 'Urgente' -- Priorizar "Urgente" si algún status es 2
            WHEN MIN(detalle_pedido_producto.status_pedido) = 1 
                 AND MAX(detalle_pedido_producto.status_pedido) = 1 THEN 'Completo'
            WHEN MIN(detalle_pedido_producto.status_pedido) = 0 THEN 'No Iniciado'
            WHEN MAX(detalle_pedido_producto.status_pedido) = 3 THEN 'En Proceso'  -- Estado "En Proceso" cuando status_pedido es 3
            ELSE 'Desconocido' 
        END AS estado_pedido
    FROM 
        pedido
    LEFT JOIN 
        detalle_pedido_producto 
        ON pedido.id_pedido = detalle_pedido_producto.id_pedido
    LEFT JOIN 
        cliente  -- Unir con la tabla cliente para obtener el nombre
        ON pedido.id_cliente = cliente.id_cliente
    GROUP BY 
        pedido.id_pedido, 
        pedido.folio, 
        cliente.id_cliente,        -- Agrupar también por id_cliente
        cliente.nombre_cliente,    -- Agrupar también por nombre del cliente
        pedido.fecha_solicitud, 
        pedido.fecha_entrega
    ORDER BY 
        CASE 
            WHEN SUM(detalle_pedido_producto.status_pedido = 2) > 0 THEN 0  -- Prioridad a "Urgente"
            WHEN MIN(detalle_pedido_producto.status_pedido) = 0 THEN 1  -- Luego "Incompleto"
            WHEN MAX(detalle_pedido_producto.status_pedido) = 3 THEN 2  -- Luego "En Proceso"
            WHEN MIN(detalle_pedido_producto.status_pedido) = 1 THEN 3  -- Finalmente "Completo"
            ELSE 4
        END ASC,
        pedido.fecha_entrega ASC;  -- Ordenar por fecha de entrega más cercana en cada grupo
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for mostrar_pedidos_por_mes
-- ----------------------------
DROP PROCEDURE IF EXISTS `mostrar_pedidos_por_mes`;
delimiter ;;
CREATE PROCEDURE `mostrar_pedidos_por_mes`(IN mes INT,  -- Mes en formato numérico, por ejemplo, 1 para enero, 2 para febrero, etc.
    IN anio INT)
BEGIN
    SELECT 
        pedido.id_pedido,
        pedido.folio,
        cliente.id_cliente AS id_cliente,             -- Incluir id_cliente
        cliente.nombre_cliente AS nombre_cliente,     -- Agregar nombre del cliente
        DATE_FORMAT(pedido.fecha_solicitud, '%d/%m/%Y') AS fecha_solicitud_formateada, -- Fecha con formato
        pedido.fecha_solicitud AS fecha_solicitud_formato, -- Fecha sin formato
        DATE_FORMAT(pedido.fecha_entrega, '%d/%m/%Y') AS fecha_entrega_formateada, -- Fecha con formato
        pedido.fecha_entrega AS fecha_entrega_formato, -- Fecha sin formato
        CASE 
            WHEN MAX(detalle_pedido_producto.status_pedido) = 2 THEN 'Urgente'
            WHEN MIN(detalle_pedido_producto.status_pedido) = 1 
                 AND MAX(detalle_pedido_producto.status_pedido) = 1 THEN 'Completo'
            WHEN MIN(detalle_pedido_producto.status_pedido) = 0 THEN 'Incompleto'
            ELSE 'Desconocido' 
        END AS estado_pedido
    FROM 
        pedido
    LEFT JOIN 
        detalle_pedido_producto 
        ON pedido.id_pedido = detalle_pedido_producto.id_pedido
    LEFT JOIN 
        cliente  -- Unir con la tabla cliente para obtener el nombre
        ON pedido.id_cliente = cliente.id_cliente
    WHERE 
        MONTH(pedido.fecha_solicitud) = mes AND YEAR(pedido.fecha_solicitud) = anio  -- Filtro por mes y año
    GROUP BY 
        pedido.id_pedido, 
        pedido.folio, 
        cliente.id_cliente,        -- Agrupar también por id_cliente
        cliente.nombre_cliente,    -- Agrupar también por nombre del cliente
        pedido.fecha_solicitud, 
        pedido.fecha_entrega
    ORDER BY 
        CASE 
            WHEN MAX(detalle_pedido_producto.status_pedido) = 2 THEN 0  -- Prioridad a "Urgente"
            WHEN MIN(detalle_pedido_producto.status_pedido) = 0 THEN 1  -- Luego "Incompleto"
            WHEN MIN(detalle_pedido_producto.status_pedido) = 1 THEN 2  -- Finalmente "Completo"
            ELSE 3
        END ASC,
        pedido.fecha_entrega ASC;  -- Ordenar por fecha de entrega más cercana en cada grupo
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ObtenerDetallesPedido
-- ----------------------------
DROP PROCEDURE IF EXISTS `ObtenerDetallesPedido`;
delimiter ;;
CREATE PROCEDURE `ObtenerDetallesPedido`(IN p_id_pedido INT)
BEGIN
    -- Actualizar el status_pedido a 1 (Completo) si la cantidad_finalizada es mayor o igual a cantidad_solicitada
    UPDATE detalle_pedido_producto
    SET status_pedido = 1
    WHERE cantidad_finalizada >= cantidad_solicitada
    AND id_pedido = p_id_pedido;

    -- Mantener el status_pedido en 2 (Urgente) si las cantidades no son iguales y el pedido ya está en Urgente
    UPDATE detalle_pedido_producto
    SET status_pedido = 2
    WHERE cantidad_finalizada < cantidad_solicitada
    AND id_pedido = p_id_pedido
    AND status_pedido = 2;

    -- Actualizar el status_pedido a 3 (En Proceso) si las cantidades no son iguales y no está en Urgente
    UPDATE detalle_pedido_producto
    SET status_pedido = 3
    WHERE cantidad_finalizada < cantidad_solicitada
    AND id_pedido = p_id_pedido
    AND status_pedido != 2;

    -- Realizar la consulta de detalles del pedido
    SELECT 
        detalle_pedido_producto.id_detalle_pedido_producto,
        detalle_pedido_producto.id_pedido,
        pedido.folio,
        pedido.fecha_solicitud,
        pedido.fecha_entrega,
        pedido.id_cliente,
        cliente.nombre_cliente,
        detalle_pedido_producto.id_producto,
        producto.nombre_producto,
        detalle_pedido_producto.cantidad_solicitada,
        detalle_pedido_producto.dimension,
        detalle_pedido_producto.cantidad_finalizada,
        CASE detalle_pedido_producto.status_pedido
            WHEN 0 THEN 'No Iniciado'
            WHEN 1 THEN 'Completo'
            WHEN 2 THEN 'Urgente'
            WHEN 3 THEN 'En Proceso'
            ELSE 'Desconocido'
        END AS status_pedido_descripcion
    FROM 
        detalle_pedido_producto
    JOIN 
        pedido ON detalle_pedido_producto.id_pedido = pedido.id_pedido
    JOIN 
        cliente ON pedido.id_cliente = cliente.id_cliente
    JOIN 
        producto ON detalle_pedido_producto.id_producto = producto.id_producto
    WHERE 
        detalle_pedido_producto.id_pedido = p_id_pedido;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ObtenerDetallesPorIdPedidoProducto
-- ----------------------------
DROP PROCEDURE IF EXISTS `ObtenerDetallesPorIdPedidoProducto`;
delimiter ;;
CREATE PROCEDURE `ObtenerDetallesPorIdPedidoProducto`(IN p_id_detalle_pedido_producto INT)
BEGIN
    SELECT 
        detalle_pasos_pedido.id_detalle_pasos_pedido,
        detalle_pasos_pedido.id_detalle_pedido_producto,
        detalle_pasos_pedido.id_ruta,
        relacion_ruta.id_paso,
        producto.nombre_producto,
        detalle_pasos_pedido.cantidad_terminada,
        detalle_pasos_pedido.responsable_cambio,
        detalle_pasos_pedido.fecha_hora_cambio,
        pasos.nombre_paso,
        detalle_pedido_producto.id_pedido,
        detalle_pedido_producto.cantidad_solicitada,
        pedido.fecha_entrega, -- Fecha en formato original
        DATE_FORMAT(pedido.fecha_entrega, '%d/%m/%Y') AS fecha_entrega_formato, -- Fecha en formato dd/mm/aaaa
				detalle_pedido_producto.dimension,
        -- Subconsulta para obtener la cantidad finalizada en el último paso
        (SELECT dp.cantidad_terminada
         FROM detalle_pasos_pedido dp
         JOIN relacion_ruta rr ON dp.id_ruta = rr.id_ruta
         WHERE dp.id_detalle_pedido_producto = p_id_detalle_pedido_producto
         ORDER BY rr.id_paso DESC
         LIMIT 1) AS cantidad_finalizada

    FROM 
        detalle_pasos_pedido
    LEFT JOIN 
        relacion_ruta ON detalle_pasos_pedido.id_ruta = relacion_ruta.id_ruta
    LEFT JOIN 
        producto ON relacion_ruta.id_producto = producto.id_producto
    LEFT JOIN 
        pasos ON relacion_ruta.id_paso = pasos.id_paso
    LEFT JOIN 
        detalle_pedido_producto ON detalle_pasos_pedido.id_detalle_pedido_producto = detalle_pedido_producto.id_detalle_pedido_producto
    LEFT JOIN 
        pedido ON detalle_pedido_producto.id_pedido = pedido.id_pedido -- Unión para obtener la fecha de entrega

    WHERE 
        detalle_pasos_pedido.id_detalle_pedido_producto = p_id_detalle_pedido_producto;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ObtenerPasosPorProducto
-- ----------------------------
DROP PROCEDURE IF EXISTS `ObtenerPasosPorProducto`;
delimiter ;;
CREATE PROCEDURE `ObtenerPasosPorProducto`(IN nombre_producto_param VARCHAR(255))
BEGIN
    SELECT 
				relacion_ruta.id_ruta,
        relacion_ruta.id_producto,
        relacion_ruta.id_paso,
        producto.nombre_producto, 
        pasos.nombre_paso
    FROM relacion_ruta
    JOIN producto ON relacion_ruta.id_producto = producto.id_producto
    JOIN pasos ON relacion_ruta.id_paso = pasos.id_paso
    WHERE producto.nombre_producto = nombre_producto_param;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ver_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `ver_cliente`;
delimiter ;;
CREATE PROCEDURE `ver_cliente`()
BEGIN
SELECT id_cliente, nombre_cliente  from cliente;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ver_producto
-- ----------------------------
DROP PROCEDURE IF EXISTS `ver_producto`;
delimiter ;;
CREATE PROCEDURE `ver_producto`(IN p_id_cliente INT)
BEGIN
    SELECT p.nombre_producto
    FROM relacion_producto_cliente rpc
    JOIN producto p ON rpc.id_producto = p.id_producto
    WHERE rpc.id_cliente = p_id_cliente;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for ver_producto_por_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `ver_producto_por_cliente`;
delimiter ;;
CREATE PROCEDURE `ver_producto_por_cliente`(IN id_cliente_param INT)
BEGIN
    -- Verificar si el cliente existe
    IF EXISTS (SELECT 1 FROM cliente WHERE id_cliente = id_cliente_param) THEN
        -- Obtener los productos del cliente
        SELECT producto.nombre_producto
        FROM producto
        JOIN relacion_producto_cliente rpc ON producto.id_producto = rpc.id_producto
        WHERE rpc.id_cliente = id_cliente_param;
    ELSE
        -- Si el cliente no existe, enviar un mensaje de error
        SELECT 'No se encontraron productos para el cliente proporcionado' AS mensaje;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for visualizar_historial
-- ----------------------------
DROP PROCEDURE IF EXISTS `visualizar_historial`;
delimiter ;;
CREATE PROCEDURE `visualizar_historial`(IN p_id_detalle_pasos_pedido INT)
BEGIN
SELECT 
    id_detalle_pasos_pedido,
    responsable_cambio,
    cantidad_terminada,
    IFNULL(DATE_FORMAT(fecha_hora_cambio, '%d/%m/%Y %H:%i:%s'), 'Fecha no válida') AS fecha_hora_cambio
FROM historial_pasos
WHERE id_detalle_pasos_pedido = p_id_detalle_pasos_pedido;

END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
