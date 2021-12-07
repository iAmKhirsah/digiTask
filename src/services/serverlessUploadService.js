export const uploadFile = async (ev) => {
  const UPLOAD_PRESET = 'eujddzcb'; //insert yours
  const CLOUD_NAME = 'dxkxsmmyr'; //insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
  const FORM_DATA = new FormData();
  FORM_DATA.append('file', ev.target.files[0]);
  FORM_DATA.append('upload_preset', UPLOAD_PRESET);
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    });
    const res_1 = await res.json();
    return res_1;
  } catch (err) {
    return console.error(err);
  }
};
