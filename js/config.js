var serviceConfig = {};   
//服务器地址
serviceConfig.serviceURL = "https://dj.lykyjt.com:8898/pctservice/";


//公共接口
service={};
service.workersList=serviceConfig.serviceURL+"workersController/workersList";
service.superviseList=serviceConfig.serviceURL+"workersController/superviseList";
//附件接口
service.fileList=serviceConfig.serviceURL+"baseController/fileList";
//申请列表(已办列表)
service.pendingList=serviceConfig.serviceURL+"approval/pendingList";
//已处理的任务列表
service.handleList=serviceConfig.serviceURL+"approval/handleList";
//驳回
service.disAgree=serviceConfig.serviceURL+"approval/disAgree";
//获取登录用户级别
service.getOrgLevel=serviceConfig.serviceURL+"baseController/getOrgLevel";
//批量提交
service.batchConfimApproval=serviceConfig.serviceURL+"approval/batchConfimApproval";

//字典接口、工会组织接口
service.enumList=serviceConfig.serviceURL+"enumController/enumList";

//---------------先进劳模接口开始-----------------------
//先进劳模起草
service.goodExampleDrafes=serviceConfig.serviceURL+"goodExample/drafes";
//先进劳模我起草的申请列表
service.goodExampleMyDrafesList=serviceConfig.serviceURL+"goodExample/myDrafesList";
//先进劳模编辑回显
service.goodExampleInfo=serviceConfig.serviceURL+"goodExample/goodExampleInfo";
//先进劳模编辑
service.goodExampleEdits=serviceConfig.serviceURL+"goodExample/edits";
//先进劳模删除
service.delGeApproval=serviceConfig.serviceURL+"goodExample/delGeApproval";
//审批意见
service.goodExampleOpinion=serviceConfig.serviceURL+"goodExample/opinionList";
//先进劳模审核接口
service.goodExampleSubmitOpinion=serviceConfig.serviceURL+"goodExample/submitOpinion";

service.goodExampleDel=serviceConfig.serviceURL+"goodExample/delGoodExample";


//---------------先进劳模接口结束-----------------------

//---------------金秋助学模接口开始-----------------------

//起草接口
service.studyAidDrafes=serviceConfig.serviceURL+"studyAid/drafes";
//金秋助学我起草的申请列表
service.studyAidMyDrafesList=serviceConfig.serviceURL+"studyAid/myDrafesList";
//编辑回显
service.studyAidInfo=serviceConfig.serviceURL+"studyAid/studyAidInfo";
service.studyAidEdits=serviceConfig.serviceURL+"studyAid/edits";
//审批意见
service.studyAidOpinion=serviceConfig.serviceURL+"studyAid/opinionList";
//审核接口
service.studyAidSubmitOpinion=serviceConfig.serviceURL+"studyAid/submitOpinion";
//---------------金秋助学接口结束-----------------------

//---------------群众安全接口开始-----------------------
//群众安全我起草的申请列表
service.massesSecurityMyDrafesList=serviceConfig.serviceURL+"massesSecurity/myDrafesList";
service.massesSecurityDrafes=serviceConfig.serviceURL+"massesSecurity/drafes";
service.massesSecurityInfo=serviceConfig.serviceURL+"massesSecurity/massesSecurityInfo";
service.massesSecurityEdits=serviceConfig.serviceURL+"massesSecurity/edits";
//---------------群众安全接口结束-----------------------


//---------------职工帮困接口开始-----------------------

//职工帮扶我起草的申请列表
service.helpWorkersMyDrafesList=serviceConfig.serviceURL+"helpWorkers/myDrafesList";
//申请
service.helpWorkersMyDraft=serviceConfig.serviceURL+"helpWorkers/draft";
//先进劳模编辑回显
service.helpWorkDifficultyInfo=serviceConfig.serviceURL+"helpWorkers/helpWorkDifficultyInfo";
//先进劳模编辑
service.helpWorkEdits=serviceConfig.serviceURL+"helpWorkers/edits";
//职工帮困提交审批
service.helpWorkSubmit=serviceConfig.serviceURL+"helpWorkers/submitOpinion";

//职工帮扶删除
service.delHelpWorker=serviceConfig.serviceURL+"helpWorkers/delHelpWorker";


//职工帮扶意见列表
service.helpWorkerOpinion=serviceConfig.serviceURL+"helpWorkers/opinionList";


//---------------职工帮困接口结束-----------------------

//---------------大病帮扶接口开始-----------------------

//职工帮扶我起草的申请列表
service.helpSeriousIllnessMyDrafesList=serviceConfig.serviceURL+"helpSeriousIllness/myDrafesList";
//申请
service.helpSeriousIllnessMyDraft=serviceConfig.serviceURL+"helpSeriousIllness/draft";
//职工帮扶编辑回显
service.helpSeriousIllnessInfo=serviceConfig.serviceURL+"helpSeriousIllness/hSerriousIllnessInfo";
//职工帮扶编辑
service.helpSeriousIllnessEdits=serviceConfig.serviceURL+"helpSeriousIllness/edits";
//职工帮扶提交审批
service.helpSeriousIllnessSubmit=serviceConfig.serviceURL+"helpSeriousIllness/submitOpinion";
//职工帮扶删除
service.delHelpSeriousIllness=serviceConfig.serviceURL+"helpSeriousIllness/delHelpSeriousIllness";
//职工帮困意见列表
service.helpSeriousIllnessOpinion=serviceConfig.serviceURL+"helpSeriousIllness/opinionList";


//---------------大病帮扶接口结束-----------------------



//职工诉求我起草的申请列表
service.workersAppealMyDrafesList=serviceConfig.serviceURL+"workersAppeal/myDrafesList";
//青安岗我起草的申请列表
service.securityProblemMyDrafesList=serviceConfig.serviceURL+"securityProblem/myDrafesList";




//--------------------------------流程环节id--------------------------------------------------------------

var activiti={};
//先进劳模
activiti.ge_apply="_3";//三级工会申请
activiti.ge_union_approval="_4";//二级工会审批
activiti.ge_group_approval="_5";//集团工会审批
//金秋助学
activiti.sa_apply="_3";//金秋助学申请
activiti.sa_union_approval="_4";//二级工会审批
activiti.sa_group_approval="_5";//集团工会审批
//群众安全
activiti.ms_apply="_3";//群监员申请
activiti.ms_union_approval="_4";//工区管理审批
activiti.ms_rectify_approval="_5";//整改人处理
activiti.ms_review_approval_1="_6";//复查人处理
activiti.ms_supervision_approval="_7";//安监部门审批
activiti.ms_review_approval_2="_8";//复查人处理

//困难帮扶
activiti.hw_apply="_3";//三级工会申请
activiti.hw_union_approval="_4";//二级工会审批
activiti.hw_group_approval="_5";//集团工会审批

//大病帮扶
activiti.hs_apply="_3";//三级工会申请
activiti.hs_union_approval="_4";//二级工会审批
activiti.hs_medical_approval="_5";//医保中心审批
activiti.hs_group_approval="_6";//集团工会审批

//青安岗
activiti.sp_apply="_3";//问题录入
activiti.sp_groupLeader_approval="_4";//群监组长审批
activiti.sp_rectify_approval="_5";//整改人处理
activiti.sp_review_approval_1="_6";//复查人处理
activiti.sp_union_approval="_7";//工区管理审批
activiti.sp_rectify_approval1="_8";//整改人处理
activiti.sp_review_approval_2="_9";//复查人处理
activiti.sp_supervision_approval="_10";//安监部门审批
activiti.sp_review_approval_2="_11";//复查人处理

//职工诉求
activiti.wa_apply="_3";//职工提报
activiti.wa_union_approval_1="_4";//二级工会回复
activiti.wa_group_approval="_5";//集团工会回复
activiti.wa_union_approval_2="_6";//二级工会回复




