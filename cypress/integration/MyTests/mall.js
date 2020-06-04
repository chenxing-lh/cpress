describe('dag冒烟',function(){
    //路由管理   新增--校验路由是否生效-查询-编辑---删除
    it('login-search-loginout:',function(){
        cy.visit('http://47.92.193.254:9999/#/login') //访问url
        cy.get('[placeholder="账号"]').type('admin')
        cy.get('[placeholder="密码"]').type('admin')
        cy.get('button[class="el-button el-button--primary el-button--medium"]').click()
        //断言是否成功登录成功
        cy.get('#__layout > div > div > div.adminster > div > div').should('contain','admin')
        cy.wait(5)
        //点击路由管理#
        cy.get('#__layout > div > section > div > ul > li:nth-child(2)').click()
        //断言是否进入到路由管理
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > form.el-form.el-form-renderer.el-form--inline > div:nth-child(1) > label').should('contain','路由名称')
        //点击新增按钮
        cy.get('button[text="新增"]').click()
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__body > div > form > div:nth-child(1) > div > div > input').type('autotest')
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__body > div > form > div:nth-child(2) > div > div > label.el-radio.is-checked').click()
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__body > div > form > div:nth-child(3) > div > div > input').type('/autotest/**')
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__body > div > form > div:nth-child(4) > div > button').click()
        cy.get('[placeholder="请输入IP:端口/域名"]').first().type('www.baidu.com')
        cy.get('[placeholder="请输入权重"]').first().type('100')
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__body > div > form > div:nth-child(5) > div > div > label:nth-child(2) > span.el-radio__label').click()
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__body > div > form > div:nth-child(6) > div > div > input').type('10')
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__footer > span > button.el-button.el-button--primary').click()
        // //--------新增成功了，开始校验路由是否生效-----
        // // 等待一下，确保路由生效，毕竟配了之后，也有延迟
        // cy.wait(10)
        // var s =-1
        // const dd = cy.request({
        //     url:'http://47.92.193.254:38080/autotest',
        //     method:'GET'
        // }).then(res => {
        //     //dd = res
        //     s = res.body.indexOf("baidu.com")
        //     console.log(s)
        //     if(s==-1){
        //         throw new Error('路由不生效')
        //     }else{
        //         console.log("新增路由校验成功")
        //     }
        // })
        // //编辑操作，修改名称和IP
        // cy.get('#__layout > div > section > main > div > div > div.el-data-table > form.el-form.el-form-renderer.el-form--inline > div:nth-child(4) > div > button.el-button.el-button--primary.el-button--small').click()
        // cy.get('button[text="编辑"]').first().click({ force: true })
        // //cy.get('#__layout > div > section > main > div > div > div.el-data-table > div.el-table.el-table--fit.el-table--scrollable-x.el-table--enable-row-transition > div.el-table__fixed-right > div.el-table__fixed-body-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > button.el-button.el-button--primary.is-plain')
        // //cy.wait(5)
        // cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__body > div > form > div:nth-child(1) > div > div > input').clear({force:true}).type('autotest_修改名称')
        // cy.get('[placeholder="请输入IP:端口/域名"]').first().clear().type('www.qq.com',{ force: true })
        // cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__footer > span > button.el-button.el-button--primary').click()
        //查询是否有该路由，根据名称查询
        cy.get('input[placeholder="请输入路由名称"]').first().clear({ force: true }).type('autotest')
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > form.el-form.el-form-renderer.el-form--inline > div:nth-child(4) > div > button.el-button.el-button--primary.el-button--small').click()
        cy.wait(5)
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > div.el-table.el-table--fit.el-table--enable-row-transition > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr > td:nth-child(1) > div').should('contain','autotest')
        //调用接口，查看是否跳转到百度页面（路由是否生效）
        // var s1 = -1
        // cy.request({
        //     url:'http://47.92.193.254:38080/autotest',
        //     method:'GET'
        // }).then(res => {
        //     //dd = res
        //     s1 = res.body.indexOf("qq.com")
        //     console.log(s1)
        //     if(s1==-1){
        //         throw new Error('修改后路由校验不生效')
        //     }else{
        //         console.log("编辑路由校验成功")
        //     }
        // })

        //删除新增的路由(第一个)
        cy.get('[type="danger"]').first().click({ force: true })
        cy.wait(2)
        cy.get('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
        cy.wait(5)
    })


    //IP访问记录  查询--加入黑名单   移出黑名单
    it('check_ip_list:',function(){
        cy.visit('http://47.92.193.254:9999/#/login') //访问url
        cy.get('[placeholder="账号"]').type('admin')
        cy.get('[placeholder="密码"]').type('admin')
        cy.get('button[class="el-button el-button--primary el-button--medium"]').click()
        //断言是否成功登录成功
        cy.get('#__layout > div > div > div.adminster > div > div').should('contain','admin')

        //进入IP访问记录#
        cy.get('#__layout > div > section > div > ul > li:nth-child(3)').click()
        cy.get('#__layout > div > section > div > ul > li:nth-child(3) > ul > li:nth-child(1)').click()
        cy.get('[placeholder="请输入IP"]').clear().type('183.6.105.176')
        cy.get('#__layout > div > section > main > div > div > div > form > div:nth-child(3) > div > button.el-button.el-button--primary.el-button--small').click()
        //点击两次
        cy.get('[role="switch"]').first().click()
        cy.get('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary').click()
        cy.get('[role="switch"]').first().click()
        cy.get('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary').click()
        
        //调接口访问，检查是否成功进入黑名单
        // cy.request({
        //     url:'http://47.92.193.254:38080/autotest',
        //     method:'GET'
        // }).then(res => {
        //     //dd = res
        //     if(res.status==430){
        //         throw new Error('路由不生效')
        //     }else{
        //         console.log("黑名单校验成功")
        //     }
        // })
        cy.wait(5)


        
    })





    // //黑名单管理  新增--校验是否生效
    it('login-check_blacklist:',function(){
        cy.visit('http://47.92.193.254:9999/#/login') //访问url
        cy.get('[placeholder="账号"]').type('admin')
        cy.get('[placeholder="密码"]').type('admin')
        cy.get('button[class="el-button el-button--primary el-button--medium"]').click()
        //断言是否成功登录成功
        cy.get('#__layout > div > div > div.adminster > div > div').should('contain','admin')

        // //点击黑名单管理#
        cy.get('#__layout > div > section > div > ul > li:nth-child(3)').click()
        cy.get('#__layout > div > section > div > ul > li:nth-child(3) > ul > li:nth-child(2)').click()
        //新增黑名单
        cy.get('#__layout > div > section > main > div > div > div > form:nth-child(2) > div > div > button').click()
        cy.get('#__layout > div > section > main > div > div > div > div.el-dialog__wrapper > div > div.el-dialog__body > form > div > div > div > input').type('192.168.1.6')
        cy.get('#__layout > div > section > main > div > div > div > div.el-dialog__wrapper > div > div.el-dialog__footer > div > button.el-button.el-button--primary.el-button--small').click()

        //查询黑名单
        cy.get('[placeholder="请输入IP"]').first().clear().type('192.168.1.6')
        cy.get('#__layout > div > section > main > div > div > div > form.el-form.el-form-renderer.el-form--inline > div:nth-child(2) > div > button.el-button.el-button--primary.el-button--small').click()

        //删除黑名单
        cy.get('[text="删除"]').first().click({force:true})
        cy.get('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary').click()
        cy.wait(5)

        // //调接口访问，检查是否成功进入黑名单
        // cy.request({
        //     url:'http://47.92.193.254:38080/autotest',
        //     method:'GET'
        // }).then(res => {
        //     //dd = res
        //     if(res.status==430){
        //         throw new Error('路由不生效')
        //     }else{
        //         console.log("黑名单校验成功")
        //     }
        // })

        
    })

    //接口限制  新增   查询  编辑  删除
    it('check_api:',function(){
        cy.visit('http://47.92.193.254:9999/#/login') //访问url
        cy.get('[placeholder="账号"]').type('admin')
        cy.get('[placeholder="密码"]').type('admin')
        cy.get('button[class="el-button el-button--primary el-button--medium"]').click()
        //断言是否成功登录成功
        cy.get('#__layout > div > div > div.adminster > div > div').should('contain','admin')

        //点击接口限制#
        cy.get('#__layout > div > section > div > ul > li:nth-child(5)').click()
        //创建接口限制，状态为启用
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > form:nth-child(2) > div > div > button').click()
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper > div > div.el-dialog__body > div > form > div.el-form-item.is-required > div > div > input').last().type('/autotest/**')
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper > div > div.el-dialog__footer > span > button.el-button.el-button--primary').click()


        //查询
        cy.get('[placeholder="请输入"]').first().clear().type('/autotest/**')
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > form.el-form.el-form-renderer.el-form--inline > div:nth-child(3) > div > button.el-button.el-button--primary.el-button--small').click()
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > div.el-table.el-table--fit.el-table--enable-row-transition > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td:nth-child(1) > div').should('contain','/autotest/**')

        // //调接口访问，检查是否成功限制是否生效
        // cy.request({
        //     url:'http://47.92.193.254:38080/autotest',
        //     method:'GET'
        // }).then(res => {
        //     //dd = res
        //     if(res.status!=403){
        //         throw new Error('接口限制不生效')
        //     }else{
        //         console.log("接口限制生效")
        //     }
        // })

        //删除接口限制
        cy.get('[type="danger"]').first().click({ force: true })
        cy.get('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
        cy.wait(5)

    })


    //认证策略
    it('strategy:',function(){
        cy.visit('http://47.92.193.254:9999/#/login') //访问url
        cy.get('[placeholder="账号"]').type('admin')
        cy.get('[placeholder="密码"]').type('admin')
        cy.get('button[class="el-button el-button--primary el-button--medium"]').click()
        //断言是否成功登录成功
        cy.get('#__layout > div > div > div.adminster > div > div').should('contain','admin')

        // //点击认证策略
        cy.get('#__layout > div > section > div > ul > li:nth-child(7)').click()
        //创建认证策略，状态为启用，匹配路径/autotest/**
        cy.get('[text="新增"]').click()
        cy.get('[placeholder="请输入名称"]').last().type('autotestByCypress')
        cy.get('[placeholder="支持多个API路径,请用;隔开"]').type('/autotest/**')
        cy.get('input[placeholder="请输入"]').type('token')
        cy.get('[placeholder="请输入密钥"]').type('test')
        cy.get('[placeholder="请输入用户ID提取方式"]').type('name')
        cy.get('#__layout > div > section > main > div > div > div.el-dialog__wrapper.pub_dialog > div > div.el-dialog__footer > span > button.el-button.el-button--primary').click()
        cy.wait(5)
        // //校验策略是否生效
        // //调用有token
        // //调接口访问，检查是否成功限制是否生效
        // cy.request({
        //     url:'http://47.92.193.254:38080/autotest',
        //     method:'GET'
        // }).then(res => {
        //     //dd = res
        //     if(res.status!=401){
        //         throw new Error('接口限制不生效')

        //     }else{
        //         console.log("接口限制生效")
        //     }
        // })

        cy.get('[placeholder="请输入名称"]').first().type('autotestByCypress')
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > form.el-form.el-form-renderer.el-form--inline > div:nth-child(4) > div > button.el-button.el-button--primary.el-button--small').click()
        cy.get('#__layout > div > section > main > div > div > div.el-data-table > div.el-table.el-table--fit.el-table--enable-row-transition > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td:nth-child(1)').should('contain','autotestByCypress')
        //删除认证策略
        cy.get('[type="danger"]').first().click({ force: true })
        cy.get('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
        cy.wait(5)
    })

    //请求日志--查询---查看详情--返回
    it.only('check_log:',function(){
        cy.visit('http://47.92.193.254:9999/#/login') //访问url
        cy.get('[placeholder="账号"]').type('admin')
        cy.get('[placeholder="密码"]').type('admin')
        cy.get('button[class="el-button el-button--primary el-button--medium"]').click()
        //断言是否成功登录成功
        cy.get('#__layout > div > div > div.adminster > div > div').should('contain','admin')

        //点击请求日志
        cy.get('#__layout > div > section > div > ul > li:nth-child(8)').click()
        //查询路径为/autotest/s的日志
        cy.get('[placeholder="输入API路径"]').type('/autotest/s')
        cy.get('#__layout > div > section > main > div > div > div > div.el-data-table > form > div:nth-child(4) > div > button:nth-child(1)').click()

        //选择第一条数据查看
        cy.get('[text="查看"]').first().click({force:true})
        cy.get('#__layout > div > section > main > div > div > div > div.el-dialog__wrapper > div > div.el-dialog__footer > span > button:nth-child(2)').click()

    })

    //流量控制--启用/禁用IP流量限制--返回//这里整个原型都变了
    // it.only('flow_control:',function(){
    //     cy.visit('http://47.92.193.254:9999/#/login') //访问url
    //     cy.get('[placeholder="账号"]').type('admin')
    //     cy.get('[placeholder="密码"]').type('admin')
    //     cy.get('button[class="el-button el-button--primary el-button--medium"]').click()
    //     //断言是否成功登录成功
    //     cy.get('#__layout > div > div > div.adminster > div > div').should('contain','admin')
    //      //点击流量控制
    //     cy.get('#__layout > div > section > div > ul > li:nth-child(9)').click()

    //     //点击IP流量限制
    //     cy.get('#__layout > div > section > main > div > div > form > div:nth-child(1) > label > span > div > span').click()
    //     cy.get('#__layout > div > section > main > div > div > form > div:nth-child(2) > label > span > div > span').click()
    //     cy.get('#__layout > div > section > main > div > div > form > div:nth-child(1) > label > span > div > span').click()
    //     cy.get('#__layout > div > section > main > div > div > form > div:nth-child(2) > label > span > div > span').click()
    //     cy.get('#__layout > div > section > main > div > div > form > div:nth-child(3) > div > button.el-button.el-button--primary').click()
    // })


})