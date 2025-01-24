// Client/src/components/ContactInformation.tsx
import React from "react";
import { GuestContactProps } from "./guestDetailTypes";

const AddressInformation: React.FC<GuestContactProps> = ({
  register,
  errors,
  labelClass,
  inputClass,
}) => (
  <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
    {/* Home Address */}
    <div className="col-span-2">
      <label htmlFor="address" className={labelClass}>
        Home Address
      </label>
      <input
        type="text"
        id="address"
        className={inputClass}
        autoComplete="street-address"
        {...register("address")}
      />
      {errors?.address && (
        <p className="text-red-500 text-sm">{errors?.address.message}</p>
      )}
    </div>

    {/* City */}
    <div>
      <label htmlFor="city" className={labelClass}>
        City
      </label>
      <input
        type="text"
        id="city"
        className={inputClass}
        autoComplete="address-level2"
        {...register("city")}
      />
      {errors?.city && (
        <p className="text-red-500 text-sm">{errors?.city.message}</p>
      )}
    </div>

    {/* Province */}
    <div>
      <label htmlFor="province" className={labelClass}>
        Province
      </label>
      <select
        id="province"
        className={inputClass}
        autoComplete="address-level1"
        defaultValue=""
        {...register("province")}
      >
        <option value="">Choose a province</option>
        <option value="BC">British Columbia</option>
        <option value="QC">Quebec</option>
        <option value="NS">Nova Scotia</option>
        <option value="NB">New Brunswick</option>
        <option value="MB">Manitoba</option>
        <option value="ON">Ontario</option>
        <option value="PE">Prince Edward Island</option>
        <option value="SK">Saskatchewan</option>
        <option value="AB">Alberta</option>
        <option value="NL">Newfoundland & Labrador</option>
      </select>
      {errors?.address && (
        <p className="text-red-500 text-sm">{errors?.province?.message}</p>
      )}
    </div>

    {/* Country */}
    <div>
      <label htmlFor="country" className={labelClass}>
        Country
      </label>
      <input
        type="text"
        id="country"
        className={inputClass}
        autoComplete="country"
        {...register("country")}
      />
      {errors?.country && (
        <p className="text-red-500 text-sm">{errors?.country.message}</p>
      )}
    </div>

    {/* Postal Code */}
    <div>
      <label htmlFor="area_code" className={labelClass}>
        Postal Code
      </label>
      <input
        type="text"
        id="area_code"
        className={inputClass}
        autoComplete="postal-code"
        {...register("area_code")}
      />
      {errors?.area_code && (
        <p className="text-red-500 text-sm">{errors?.area_code.message}</p>
      )}
    </div>
  </div>
);

export default AddressInformation;
