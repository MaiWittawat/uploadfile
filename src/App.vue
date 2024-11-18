<template>
  <div>
    <form @submit.prevent="submitForm">
      <input type="file" ref="fileInput" />
      <button type="submit">Upload</button>
    </form>

    <div>
      <progress ref="uploadProgress" value="0" max="100" style="width: 100%"></progress>
      <span ref="uploadPercentageDisplay">0%</span>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const fileInput = ref(null);
// เพิ่ม 2 อันนี้เข้ามา
const progressBar = ref(null)
const uploadPercentageDisplay = ref(null)

const submitForm = async () => { 
  const file = fileInput.value.files[0]; // ดึงไฟล์แรกที่เลือก
  if (!file) {
    console.log("Please select a file.");
    return;
  }

  // สร้าง FormData เพื่อส่งไฟล์ไปยัง backend
  const formData = new FormData();
  formData.append("uploadKEY", file);

  try {
    const response = await axios.post("http://localhost:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent)=>{
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        if (progressBar.value) progressBar.value.value = percentCompleted;
        if (uploadPercentageDisplay.value) uploadPercentageDisplay.value.innerText = `${percentCompleted}%`;
      }
    });
    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
    alert('Error uploading file')
  }
};
</script>
