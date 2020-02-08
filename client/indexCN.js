var table,layer,id;
layui.use(['table','layer'], function(){
    table = layui.table;
    layer = layui.layer;
    table.render({
        elem: '#test'
        ,url:'http://localhost:3001/products'
        ,cols: [[
            {field:'productId', title: '产品ID'}
            ,{field:'productName', title: '产品名称'}
            ,{field:'productLength', title: '产品长度'}
            ,{field:'productWidth', title: '产品宽度'}
            ,{field:'productPrice', title: '产品价格'}
            ,{field:'productOrigin', title: '产品产地'}
            ,{field:'productQuantity', title: '产品数量'}
            ,{field:'created', title: '创建日期'}
            ,{field:'updated', title: '编辑日期'}
            ,{fixed: 'right', width: 200, title: '操作', align:'center', toolbar: '#barDemo'}        
]]
        ,toolbar: '#barDemo2'
        ,page: true
        ,title: "产品CRUD"
    });
//监听工具条 
table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

    if (layEvent === 'detail') { //查看
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "产品",
            content: `<div>
                             <p><span>产品ID:</span> <span>${data["productId"]}</span></p>
                             <p><span>名称:</span> <span>${data["productName"]}</span></p>
                             <p><span>长度:</span> <span>${data["productLength"]}</span></p>
                             <p><span>宽度:</span> <span>${data["productWidth"]}</span></p>
                             <p><span>价格:</span> <span>${data["productPrice"]}</span></p>
                             <p><span>产地:</span> <span>${data["productOrigin"]}</span></p>
                             <p><span>数量:</span> <span>${data["productQuantity"]}</span></p>
                             <p><span>创建日期:</span> <span>${data["created"]}</span></p>
                             <p><span>编辑日期:</span> <span>${data["updated"]}</span></p>
                            </div>`
        });
        //layer.msg(JSON.stringify(data));
        console.log(data);
    } else if (layEvent === 'del') { //删除
        id = data["productId"];
        layer.open({
            btn: [],
            shade: 0,
            title: "删除产品",
            content: `<div><div class="mb-15 tc">确定删除产品?</div><div class="tr"><button id="buttonDelete" type="submit" class="layui-btn layui-btn-danger">删除</button></div></div>`
        });
        document.getElementById("buttonDelete").addEventListener("click", function (e) {
            deleteProductPost();
        });
    } else if (layEvent === 'edit') { //编辑
        id = data["productId"];
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑产品",
            content: `<form class="layui-form layui-form-pane" action="">
                              <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["productName"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">长度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productLength" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${data["productLength"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">宽度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productWidth" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["productWidth"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productPrice" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${data["productPrice"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">产地</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productOrigin" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["productOrigin"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">数量</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productQuantity" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["productQuantity"]}">
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
            e.preventDefault();
            editProductPost();
        });
    } 


});

table.on('toolbar(test)', function(obj){
  var checkStatus = table.checkStatus(obj.config.id);
  switch(obj.event){
    case 'create':
         layer.open({
            btn: [],
            shade: 0,
            title: "新建产品",
            content: `<form class="layui-form layui-form-pane" action="">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">长度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productLength" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">宽度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productWidth" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productPrice" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">产地</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productOrigin" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">数量</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productQuantity" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
            e.preventDefault();
            createProductPost();
        });
    break;
  }
});
});
function editProductPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var productName = inputs[0].value;
    var productLength = inputs[1].value;
    var productWidth = inputs[2].value;
    var productPrice = inputs[3].value;
    var productOrigin = inputs[4].value;
    var productQuantity = inputs[5].value;
    $.ajax({
        type: "post",
        url: `http://localhost:3001/products/${id}`,
        data: {
            "productName": productName, "productLength": productLength, "productWidth": productWidth, "productPrice": productPrice, "productOrigin": productOrigin, "productQuantity": productQuantity
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 1){
                layer.closeAll();
                layer.msg("产品已编辑");
                table.reload('test', {
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});
                //$('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function deleteProductPost() {
    $.ajax({
        type: "get",
        url: `http://localhost:3001/deleteProduct/${id}`,
        dataType: "json",
        success: function (data) {
            if (data.code === 1) {
                layer.closeAll();
                layer.msg("产品已删除");
                table.reload('test', { 
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});         
            
}
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

function createProductPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var productName = inputs[0].value;
    var productLength = inputs[1].value;
    var productWidth = inputs[2].value;
    var productPrice = inputs[3].value;
    var productOrigin = inputs[4].value;
    var productQuantity = inputs[5].value;
    $.ajax({
        type: "post",
        url: `http://localhost:3001/products`,
        data: {
            "productName": productName, "productLength": productLength, "productWidth": productWidth, "productPrice": productPrice, "productOrigin": productOrigin, "productQuantity": productQuantity
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 1){
                layer.closeAll();
                layer.msg("产品已创建");
                //$('#dg').datagrid('reload');
                 table.reload('test', {
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});
            
}
        },
        error: function (item, err) {
        }
    });
}

function searchProduct(){
    var searchTerm = document.getElementById('inputSearchProduct').value;
    var searchTermFinal = "";
    if (searchTerm !== ""){
        searchTermFinal = searchTerm;
    }
    /*$("#dg").datagrid({
        url: `http://localhost:8080/searchProduct?term=${searchTermFinal}`,
        method: 'get',
        onLoadSuccess: function (data) {
        }*/
   table.reload('test', {
  	url: `http://localhost:3001/searchProduct?term=${searchTermFinal}`
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});


}
