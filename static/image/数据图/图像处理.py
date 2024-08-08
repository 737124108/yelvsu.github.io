import cv2
import numpy as np

def remove_background(image_path):
    try:
        # 读取图像
        image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
        
        if image is None:
            raise FileNotFoundError(f"Unable to read image at {image_path}")
        
        if image.shape[2] == 3:  # RGB 图像没有 alpha 通道
            # 添加 alpha 通道并初始化为不透明
            bgr = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
            alpha_channel = np.ones(bgr.shape[:2], dtype=bgr.dtype) * 255
            bgr = cv2.merge((bgr, alpha_channel))
        elif image.shape[2] == 4:  # RGBA 图像，包含 alpha 通道
            # 提取 alpha 通道
            alpha_channel = image[:, :, 3]
            
            # 创建一个 mask，将所有不透明的区域置为白色（255）
            _, mask = cv2.threshold(alpha_channel, 254, 255, cv2.THRESH_BINARY)
            
            # 反转 mask
            mask_inv = cv2.bitwise_not(mask)
            
            # 分离图像的颜色和 alpha 通道
            bgr = image[:, :, 0:3]
            
            # 为背景图像创建白色图像
            white_background = np.full_like(bgr, 255)
            
            # 将背景图像中的非透明部分保留
            foreground = cv2.bitwise_and(bgr, bgr, mask=mask)
            
            # 将背景图像中的透明部分保留
            background = cv2.bitwise_and(white_background, white_background, mask=mask_inv)
            
            # 合并前景和背景
            bgr = cv2.add(foreground, background)
        else:
            raise ValueError("Unsupported image format")
        
        # 转换为RGB格式（如果不是RGB）
        if bgr.shape[2] == 4:  # 如果是BGRA，去掉alpha通道
            bgr = bgr[:, :, 0:3]
        elif bgr.shape[2] != 3:  # 如果不是RGB或者BGRA，尝试转换为RGB
            bgr = cv2.cvtColor(bgr, cv2.COLOR_BGRA2BGR)
        
        # 裁剪图像边缘
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        _, alpha = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY)
        contours, _ = cv2.findContours(alpha, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        x, y, w, h = cv2.boundingRect(contours[0])
        bgr_cropped = bgr[y:y+h, x:x+w]
        
        return bgr_cropped
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return None

if __name__ == "__main__":
    # 图片路径
    image_path = "222.png"
    
    # 去除背景并裁剪
    image = remove_background(image_path)
    
    if image is not None:
        # 进行其他处理或保存图像
        cv2.imwrite("output_image.png", image)
        print("处理完成，输出图像保存为 output_image.png")
    else:
        print("处理失败，请检查输入的图像路径和文件是否有效。")
