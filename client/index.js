var table,layer;
layui.use(['form','layedit','table','layer','element'], function(){
    form = layui.form,
layedit = layui.layedit,
    table = layui.table,
    layer = layui.layer,
element = layui.element;
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
        ,page: true
        ,title: "产品CRUD"
    });
//监听工具条 
table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
  var data = obj.data; //获得当前行数据
  var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
  var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
 
  if(layEvent === 'detail'){ //查看
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
  } else if(layEvent === 'del'){ //删除
    layer.confirm('真的删除行么', function(index){
      obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
      layer.close(index);
      //向服务端发送删除指令
    });
  } else if(layEvent === 'edit'){ //编辑
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
                      <input type="text" name="productLength" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${data["productName"]}">
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
        document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
            e.preventDefault();
            //editProductPost();
        });
  } 
});
});
