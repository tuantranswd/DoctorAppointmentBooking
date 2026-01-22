import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_frontend/assets";
import { useAppContext } from "../context/useAppContext";

/**
 * Component hiển thị và chỉnh sửa thông tin cá nhân của người dùng
 * Cho phép người dùng xem và cập nhật các thông tin như tên, email, số điện thoại, địa chỉ, giới tính và ngày sinh
 */
const MyProfile = () => {
  // Đặt giá trị mặc định {} cho userData để tránh undefined
  const { userData = {}, getUserProfile, updateUserProfile } = useAppContext();

  /**
   * Hàm format ngày sinh theo định dạng DD/MM/YYYY
   * @param {string} dateString - Chuỗi ngày tháng (có thể là ISO format hoặc các định dạng khác)
   * @returns {string} - Ngày tháng đã được format hoặc chuỗi rỗng nếu không hợp lệ
   */
  const formatDateOfBirth = (dateString) => {
    if (!dateString || dateString === "Not Selected") {
      return "";
    }

    try {
      // Tạo đối tượng Date từ chuỗi
      const date = new Date(dateString);

      // Kiểm tra xem ngày có hợp lệ không
      if (Number.isNaN(date.getTime())) {
        return dateString; // Trả về chuỗi gốc nếu không parse được
      }

      // Lấy ngày, tháng, năm
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      // Trả về định dạng DD/MM/YYYY
      return `${day}/${month}/${year}`;
    } catch {
      // Nếu có lỗi, trả về chuỗi gốc
      return dateString;
    }
  };

  // State quản lý trạng thái chỉnh sửa (true: đang chỉnh sửa, false: đang xem)
  const [isEdit, setIsEdit] = useState(false);

  // State quản lý file ảnh mới
  const [image, setImage] = useState(null);

  // State local cho các trường edit, dùng optional chaining để tránh lỗi khi userData chưa sẵn sàng
  const [name, setName] = useState(userData?.name || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [address, setAddress] = useState(userData?.address || {});
  const [gender, setGender] = useState(
    userData?.gender === "Not Selected" ? "" : userData?.gender || "",
  );
  const [dob, setDob] = useState(
    userData?.dob === "Not Selected" ? "" : userData?.dob || "",
  );

  // Gọi getUserProfile khi component mount
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="flex flex-col gap-2 pt-5 max-w-lg text-sm">
      {/* Hình ảnh đại diện người dùng */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              alt=""
              className="opacity-75 rounded w-36"
              src={
                image
                  ? URL.createObjectURL(image)
                  : userData?.image || assets.profile_pic
              }
            />
            <img
              alt=""
              className="right-12 bottom-12 absolute w-10"
              src={assets.upload_icon}
            />
          </div>
          <input
            accept="image/*"
            hidden
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
          />
        </label>
      ) : (
        <img
          alt=""
          className="rounded w-36"
          src={userData?.image || assets.profile_pic}
        />
      )}

      {/* Hiển thị hoặc chỉnh sửa tên người dùng */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 px-2 py-1 border rounded"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData?.name || ""}
        </p>
      )}

      {/* Đường phân cách */}
      <hr className="bg-zinc-400 h-[1px] border-none opacity-50" />

      {/* Phần thông tin liên hệ */}
      <div>
        <p className="text-neutral-500 underline mt-3">THÔNG TIN LIÊN HỆ</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          {/* Email */}
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData?.email || ""}</p>

          {/* Số điện thoại */}
          <p className="font-medium">Số điện thoại:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52 px-1 rounded"
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              value={phone}
            />
          ) : (
            <p className="text-blue-400">{userData?.phone || ""}</p>
          )}

          {/* Địa chỉ */}
          <p className="font-medium">Địa chỉ:</p>
          {isEdit ? (
            <p>
              {/* Dòng địa chỉ 1 */}
              <input
                className="bg-gray-50 w-full mb-1 px-1 rounded"
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, line1: e.target.value }))
                }
                type="text"
                value={address.line1 || ""}
              />
              <br />
              {/* Dòng địa chỉ 2 */}
              <input
                className="bg-gray-50 w-full px-1 rounded"
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, line2: e.target.value }))
                }
                type="text"
                value={address.line2 || ""}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1 || ""}
              <br />
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* Phần thông tin cơ bản */}
      <div>
        <p className="text-neutral-500 underline mt-3">THÔNG TIN CƠ BẢN</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          {/* Giới tính */}
          <p className="font-medium">Giới tính:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100 px-1 rounded"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          ) : (
            <p className="text-gray-400">
              {userData?.gender === "Male"
                ? "Nam"
                : userData?.gender === "Female"
                  ? "Nữ"
                  : ""}
            </p>
          )}

          {/* Ngày sinh */}
          <p className="font-medium">Ngày sinh:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100 px-1 rounded"
              onChange={(e) => setDob(e.target.value)}
              type="date"
              value={dob}
            />
          ) : (
            <p className="text-gray-400">{formatDateOfBirth(userData?.dob)}</p>
          )}
        </div>
      </div>

      {/* Nút chỉnh sửa hoặc lưu thông tin */}
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all"
            onClick={async () => {
              const formData = new FormData();
              formData.append("name", name);
              formData.append("phone", phone);
              formData.append("address", JSON.stringify(address));
              formData.append("dob", dob);
              formData.append("gender", gender);
              if (image) {
                formData.append("image", image);
              }

              const result = await updateUserProfile(formData);
              if (result.success) {
                toast.success("Cập nhật thông tin thành công");
                await getUserProfile();
                setIsEdit(false);
                setImage(null);
              } else {
                toast.error(result.message);
              }
            }}
            type="button"
          >
            Lưu thông tin
          </button>
        ) : (
          <button
            className="border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => {
              // Khởi tạo state local từ userData khi bắt đầu chỉnh sửa
              setName(userData?.name || "");
              setPhone(userData?.phone || "");
              setAddress(userData?.address || {});
              setGender(
                userData?.gender === "Not Selected"
                  ? ""
                  : userData?.gender || "",
              );
              setDob(
                userData?.dob === "Not Selected" ? "" : userData?.dob || "",
              );
              setIsEdit(true);
            }}
            type="button"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
