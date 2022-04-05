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
   * 职位
   */
  type: string;
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
  /**
   * 当前活跃
   */
  active?: boolean;
}

/**
 * 奖品
 *
 * @interface
 */
export interface Prize {
  /**
   * ID
   */
  id: string;
  /**
   * 类别
   */
  type: string;
  /**
   * 名称
   */
  name: string;
}
