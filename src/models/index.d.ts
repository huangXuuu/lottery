/**
 * 用户
 *
 * @interface
 */
export interface User {
  /**
   * ID
   */
  id: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 头像
   */
  image: string;
  /**
   * 中奖次数
   */
  prizeCounts: number;
}
