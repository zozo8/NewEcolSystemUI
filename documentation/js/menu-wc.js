'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">new-ecol-system-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-d7412e5013c22565a07189c1f2cd68b184c029cc742702165267a2af260c279dd990e20950a1c0d22ff4c6be966d0afff849f57befcf861c3cd8a2a46c4ebfb6"' : 'data-target="#xs-components-links-module-AdminModule-d7412e5013c22565a07189c1f2cd68b184c029cc742702165267a2af260c279dd990e20950a1c0d22ff4c6be966d0afff849f57befcf861c3cd8a2a46c4ebfb6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-d7412e5013c22565a07189c1f2cd68b184c029cc742702165267a2af260c279dd990e20950a1c0d22ff4c6be966d0afff849f57befcf861c3cd8a2a46c4ebfb6"' :
                                            'id="xs-components-links-module-AdminModule-d7412e5013c22565a07189c1f2cd68b184c029cc742702165267a2af260c279dd990e20950a1c0d22ff4c6be966d0afff849f57befcf861c3cd8a2a46c4ebfb6"' }>
                                            <li class="link">
                                                <a href="components/UserDepartmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDepartmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserParamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserParamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-711bd8b97f715f7dbfc892c131f50a47dfdfbc831fab2cf780f821aaef5b46b96c505bdb29402865cc247ee634ce121fd83aa375b62c6931205b25a81450ed7a"' : 'data-target="#xs-components-links-module-AppModule-711bd8b97f715f7dbfc892c131f50a47dfdfbc831fab2cf780f821aaef5b46b96c505bdb29402865cc247ee634ce121fd83aa375b62c6931205b25a81450ed7a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-711bd8b97f715f7dbfc892c131f50a47dfdfbc831fab2cf780f821aaef5b46b96c505bdb29402865cc247ee634ce121fd83aa375b62c6931205b25a81450ed7a"' :
                                            'id="xs-components-links-module-AppModule-711bd8b97f715f7dbfc892c131f50a47dfdfbc831fab2cf780f821aaef5b46b96c505bdb29402865cc247ee634ce121fd83aa375b62c6931205b25a81450ed7a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfigComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagramOrdersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiagramOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagramPercentageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiagramPercentageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExportDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExportDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InlineMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InlineMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeftMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeftMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainSummaryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainSummaryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuitemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuitemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotfoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotfoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsUnderMinimalStateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsUnderMinimalStateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RightmenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RightmenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectDepartmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectDepartmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Summary1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Summary1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Summary2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Summary2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TodayOrdersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodayOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DictionariesModule.html" data-type="entity-link" >DictionariesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DictionariesModule-9f18ebe7f7cda392515e7693074df4c6c244988fb6bb6661104242508ca863dacfb97c22f0b4c6bb44f084f4e2bf76418f988acc2065c178c5b91e22220186b8"' : 'data-target="#xs-components-links-module-DictionariesModule-9f18ebe7f7cda392515e7693074df4c6c244988fb6bb6661104242508ca863dacfb97c22f0b4c6bb44f084f4e2bf76418f988acc2065c178c5b91e22220186b8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DictionariesModule-9f18ebe7f7cda392515e7693074df4c6c244988fb6bb6661104242508ca863dacfb97c22f0b4c6bb44f084f4e2bf76418f988acc2065c178c5b91e22220186b8"' :
                                            'id="xs-components-links-module-DictionariesModule-9f18ebe7f7cda392515e7693074df4c6c244988fb6bb6661104242508ca863dacfb97c22f0b4c6bb44f084f4e2bf76418f988acc2065c178c5b91e22220186b8"' }>
                                            <li class="link">
                                                <a href="components/ClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EstimateTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstimateTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductTradeNameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductTradeNameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductTradeNameFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductTradeNameFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DictionariesRoutingModule.html" data-type="entity-link" >DictionariesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-de005cd99613efb1328a3ccd5d320fc35bce102371d29f5cb615d5e809ecc3ddf4a3e75356d98721a4b2fca84ec62081980922a674c356451042d4f3cc77c235"' : 'data-target="#xs-components-links-module-LoginModule-de005cd99613efb1328a3ccd5d320fc35bce102371d29f5cb615d5e809ecc3ddf4a3e75356d98721a4b2fca84ec62081980922a674c356451042d4f3cc77c235"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-de005cd99613efb1328a3ccd5d320fc35bce102371d29f5cb615d5e809ecc3ddf4a3e75356d98721a4b2fca84ec62081980922a674c356451042d4f3cc77c235"' :
                                            'id="xs-components-links-module-LoginModule-de005cd99613efb1328a3ccd5d320fc35bce102371d29f5cb615d5e809ecc3ddf4a3e75356d98721a4b2fca84ec62081980922a674c356451042d4f3cc77c235"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UniversalComponentsModule.html" data-type="entity-link" >UniversalComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' : 'data-target="#xs-components-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' :
                                            'id="xs-components-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' }>
                                            <li class="link">
                                                <a href="components/FormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDictionaryValueDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormDictionaryValueDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormTableSetColumnComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormTableSetColumnComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UniversalComponentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UniversalComponentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' : 'data-target="#xs-injectables-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' :
                                        'id="xs-injectables-links-module-UniversalComponentsModule-73345fb44c86e770fb810761f22b2b3d643199b349d20c5a82843f7990287f0d7525bd08dd26bf63d91fc36e752dbc9f2dec9a168dcdda36c3512f6789469289"' }>
                                        <li class="link">
                                            <a href="injectables/TableButtonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableButtonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UniversalComponentsRoutingModule.html" data-type="entity-link" >UniversalComponentsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DictionariesComponent.html" data-type="entity-link" >DictionariesComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseTreeFilteredDto.html" data-type="entity-link" >BaseTreeFilteredDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Client.html" data-type="entity-link" >Client</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColumnSetting.html" data-type="entity-link" >ColumnSetting</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultProperties.html" data-type="entity-link" >DefaultProperties</a>
                            </li>
                            <li class="link">
                                <a href="classes/Department.html" data-type="entity-link" >Department</a>
                            </li>
                            <li class="link">
                                <a href="classes/estimateType.html" data-type="entity-link" >estimateType</a>
                            </li>
                            <li class="link">
                                <a href="classes/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterColumnName.html" data-type="entity-link" >FilterColumnName</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterMetaData.html" data-type="entity-link" >FilterMetaData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterRequest.html" data-type="entity-link" >FilterRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParamDict.html" data-type="entity-link" >ParamDict</a>
                            </li>
                            <li class="link">
                                <a href="classes/productTradeName.html" data-type="entity-link" >productTradeName</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestBodyGetList.html" data-type="entity-link" >RequestBodyGetList</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseBodyById.html" data-type="entity-link" >ResponseBodyById</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseBodyGetList.html" data-type="entity-link" >ResponseBodyGetList</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseBodyGetListValue.html" data-type="entity-link" >ResponseBodyGetListValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseColumnSetting.html" data-type="entity-link" >ResponseColumnSetting</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseColumnSettingValue.html" data-type="entity-link" >ResponseColumnSettingValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseColumnSettingValueData.html" data-type="entity-link" >ResponseColumnSettingValueData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseError.html" data-type="entity-link" >ResponseError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseGridDataColumn.html" data-type="entity-link" >ResponseGridDataColumn</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseGridDataColumnValue.html" data-type="entity-link" >ResponseGridDataColumnValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tab.html" data-type="entity-link" >Tab</a>
                            </li>
                            <li class="link">
                                <a href="classes/tableColsStructure.html" data-type="entity-link" >tableColsStructure</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableMenuStructure.html" data-type="entity-link" >TableMenuStructure</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDepartment.html" data-type="entity-link" >UserDepartment</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserGroup.html" data-type="entity-link" >UserGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserParam.html" data-type="entity-link" >UserParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUserGroup.html" data-type="entity-link" >UserUserGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/XprimerClient.html" data-type="entity-link" >XprimerClient</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BreadcrumbService.html" data-type="entity-link" >BreadcrumbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link" >CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardMenuService.html" data-type="entity-link" >DashboardMenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardPageService.html" data-type="entity-link" >DashboardPageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormTableSetColumnService.html" data-type="entity-link" >FormTableSetColumnService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link" >LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeftMenuService.html" data-type="entity-link" >LeftMenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link" >MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService-1.html" data-type="entity-link" >MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableButtonService.html" data-type="entity-link" >TableButtonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableMenuService.html" data-type="entity-link" >TableMenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableService.html" data-type="entity-link" >TableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreeService.html" data-type="entity-link" >TreeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthconfigInterceptor.html" data-type="entity-link" >AuthconfigInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/exportOutput.html" data-type="entity-link" >exportOutput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataset.html" data-type="entity-link" >IDataset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataset-1.html" data-type="entity-link" >IDataset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDepartmentState.html" data-type="entity-link" >IDepartmentState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDictionaryComponent.html" data-type="entity-link" >IDictionaryComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDictionaryComponent-1.html" data-type="entity-link" >IDictionaryComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMasterPage.html" data-type="entity-link" >IMasterPage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISelectDepartemnt.html" data-type="entity-link" >ISelectDepartemnt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISelectDepartemntValue.html" data-type="entity-link" >ISelectDepartemntValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITableButtonsComponent.html" data-type="entity-link" >ITableButtonsComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITableComponent.html" data-type="entity-link" >ITableComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITableFormComponent.html" data-type="entity-link" >ITableFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITreeNode.html" data-type="entity-link" >ITreeNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginCredentialMD.html" data-type="entity-link" >LoginCredentialMD</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginState.html" data-type="entity-link" >LoginState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseLoginUR.html" data-type="entity-link" >ResponseLoginUR</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RootState.html" data-type="entity-link" >RootState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Token.html" data-type="entity-link" >Token</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});