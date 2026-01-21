import { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

/**
 * Component hiển thị và chỉnh sửa thông tin cá nhân của người dùng
 * Cho phép người dùng xem và cập nhật các thông tin như tên, email, số điện thoại, địa chỉ, giới tính và ngày sinh
 */
const MyProfile = () => {
  // State quản lý thông tin người dùng
  const [userData, setUserData] = useState({
    address: {
      line1: "Số 17, Đường Nguyễn Văn Linh",
      line2: "Phường Tân Thuận Tây, Quận 7, TP. Hồ Chí Minh",
    },
    dob: "2001-11-24",
    email: "anhtuan2411.dev@gmail.com",
    gender: "Female",
    image: assets.profile_pic,
    name: "Trần Anh Tuấn",
    phone: "000000000",
  });

  // State quản lý trạng thái chỉnh sửa (true: đang chỉnh sửa, false: đang xem)
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex flex-col gap-2 pt-5 max-w-lg text-sm">
      {/* Hình ảnh đại diện người dùng */}
      <img alt="" className="rounded w-36" src={userData.image} />

      {/* Hiển thị hoặc chỉnh sửa tên người dùng */}
      {isEdit ? (
        <input
          className="bg-gray-50 mt-4 outline-none max-w-60 font-medium text-3xl"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          value={userData.name}
        />
      ) : (
        <p className="mt-4 font-medium text-[#262626] text-3xl">
          {userData.name}
        </p>
      )}

      {/* Đường phân cách */}
      <hr className="bg-[#ADADAD] border-none h-px" />

      {/* Phần thông tin liên hệ */}
      <div>
        <p className="mt-3 text-gray-600 underline">THÔNG TIN LIÊN HỆ</p>
        <div className="gap-y-2.5 grid grid-cols-[1fr_3fr] mt-3 text-[#363636]">
          {/* Email */}
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          {/* Số điện thoại */}
          <p className="font-medium">Số điện thoại:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 outline-none max-w-52"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              type="text"
              value={userData.phone}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          {/* Địa chỉ */}
          <p className="font-medium">Địa chỉ:</p>
          {isEdit ? (
            <p>
              {/* Dòng địa chỉ 1 */}
              <input
                className="bg-gray-50 outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                value={userData.address.line1}
              />
              <br />
              {/* Dòng địa chỉ 2 */}
              <input
                className="bg-gray-50 outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                value={userData.address.line2}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Phần thông tin cơ bản */}
      <div>
        <p className="mt-3 text-[#797979] underline">THÔNG TIN CƠ BẢN</p>
        <div className="gap-y-2.5 grid grid-cols-[1fr_3fr] mt-3 text-gray-600">
          {/* Giới tính */}
          <p className="font-medium">Giới tính:</p>
          {isEdit ? (
            <select
              className="bg-gray-50 outline-none max-w-20"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          ) : (
            <p className="text-gray-500">
              {userData.gender === "Male" ? "Nam" : "Nữ"}
            </p>
          )}

          {/* Ngày sinh */}
          <p className="font-medium">Ngày sinh:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 outline-none max-w-28"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              type="date"
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Nút chỉnh sửa hoặc lưu thông tin */}
      <div className="mt-10">
        {isEdit ? (
          <button
            className="hover:bg-primary px-8 py-2 border border-primary rounded-full hover:text-white transition-all cursor-pointer"
            onClick={() => setIsEdit(false)}
            type="button"
          >
            Lưu thông tin
          </button>
        ) : (
          <button
            className="hover:bg-primary px-8 py-2 border border-primary rounded-full hover:text-white transition-all cursor-pointer"
            onClick={() => setIsEdit(true)}
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
