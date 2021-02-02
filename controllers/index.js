/**
 * b1: tạo đối tượng Album
 * b2: lấy thông tin ng dùng nhập từ input gán vào đối tượng Album
 * b3: push đối tượng Album vào danhSachAlbum
 * b4: hiển thị danhSachAlbum ra màn hình
 * b5: thực hiện capNhat, Xoa, them Album
 * b6: validation
 *
 */

// 1- tạo đối tượng Album - done

import { Album } from "../models/album.js";
let listAlbum = [];

let isValue = true;
// 2- lấy thông tin ng dùng nhập từ input gán vào đối tượng Album

document.getElementById("btnThemAlbum").onclick = () => {
    document.getElementById("btnCapNhatAlbum").style.display = "none";
    let album = new Album();

    let arrInput = document.querySelectorAll(
        ".card-body input, .card-body select"
    );
    for (let item of arrInput) {
        let { id, value } = item;
        album[id] = value;
    }
    validation(album);
    if (isValue) {
        listAlbum.push(album);
        saveLocal();
        hienThiListAlbum(listAlbum);
    }

    document.getElementById("linkAnh").value = "";
    document.getElementById("moTa").value = "";
    document.getElementById("theLoai").value = "Album gái xinh";
    document.getElementById("tenAlbum").value = "";
};

// 4- hiển thị thông tin album ra màn hình

let hienThiListAlbum = (arrayAlbum) => {
    let content = "";
    for (let item of arrayAlbum) {
        content += `

        
        <div class = 'col-4'>
        
        <div class="card mb-4 box-shadow" >
          <div class="reponsive-img"  style="background-image: url( ${item.linkAnh} );">
        </div>
          <div class="card-body">
            <h3>Tên Album: ${item.tenAlbum}</h3>
            <p class="card-text">Mô tả: ${item.moTa}</p>
            <p class="card-text">Thể loại: ${item.theLoai}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-success text-white btn-sm btn-outline-secondary mr-2" onclick = "chinhSuaAlbum('${item.tenAlbum}')">Chỉnh sửa</button>
                <button type="button" class="btn btn-danger text-white btn-sm btn-outline-secondary" onclick = "xoaAlbum('${item.tenAlbum}')" >Xóa</button>
              </div>
            </div>
          </div>
        </div>
        </div>
                 
        `;
    }

    document.getElementById("album").innerHTML = content;
};


//---------- lấy thông tin ở localStorage hiển thị lên giao diện khi load lại web------------
debugger;
let getLocalStorage = () => {
    return listAlbum = JSON.parse(localStorage.getItem("danhSachAlbum"));
};
getLocalStorage();
hienThiListAlbum(listAlbum);
// 5- xử lý xóa

window.xoaAlbum = (nameAlbum) => {
    let index = listAlbum.findIndex((item) => item.tenAlbum === nameAlbum);
    listAlbum.splice(index, 1);
    saveLocal();
    hienThiListAlbum(listAlbum);
};

// 6- chỉnh sửa thông tin

window.chinhSuaAlbum = (nameAlbum) => {
    document.getElementById("btnCapNhatAlbum").style.display = "inline-block";
    document.getElementById("btnThemAlbum").style.display = "none";
    document.getElementById("tenAlbum").disabled = true;

    document.getElementById("txtThongBao").innerHTML = "";

    let chooseItem = listAlbum.find((item) => item.tenAlbum === nameAlbum);

    document.getElementById("linkAnh").value = chooseItem.linkAnh;
    document.getElementById("moTa").value = chooseItem.moTa;
    document.getElementById("theLoai").value = chooseItem.theLoai;
    document.getElementById("tenAlbum").value = chooseItem.tenAlbum;
};

// 7- cập nhật thông tin

document.getElementById("btnCapNhatAlbum").onclick = () => {
    document.getElementById("btnThemAlbum").style.display = "inline-block";
    document.getElementById("btnCapNhatAlbum").style.display = "none";
    document.getElementById("tenAlbum").disabled = false;

    let newAlbum = new Album();
    let arrInput = document.querySelectorAll(".card-body input, .card-body select");
    for (let item of arrInput) {
        let { id, value } = item;
        newAlbum[id] = value;
    }

    // tìm vị trí nhân viên cần cập nhật

    let index = listAlbum.findIndex(album => album.tenAlbum === newAlbum.tenAlbum);
    listAlbum[index] = newAlbum;

    saveLocal();
    hienThiListAlbum(listAlbum);
    document.getElementById("linkAnh").value = "";
    document.getElementById("moTa").value = "";
    document.getElementById("theLoai").value = "Album gái xinh";
    document.getElementById("tenAlbum").value = "";
};

// 8- validation

let validation = (album) => {
    for (let item of listAlbum) {
        if (item.tenAlbum === album.tenAlbum) {
            isValue = false;
            document.getElementById("txtThongBao").innerHTML =
                " * Tên album bị trùng, nhập tên album khác *";
            break;
        } else {
            isValue = true;
            document.getElementById("txtThongBao").innerHTML = "";
        }
    }
};

// 9- lưu thông tin ở LocalStorage

let saveLocal = () => localStorage.setItem("danhSachAlbum", JSON.stringify(listAlbum));