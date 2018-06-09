import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) { }

  load(): Promise<any> {
    return this.httpClient.get('assets/app-data.json').map((data: any) => {
      if (!data) {
        return;
      }
      // 应用信息：包括站点名、描述、年份
      this.settingService.setApp(data.app);
      // 用户信息：包括姓名、头像、邮箱地址
      // this.settingService.setUser(data.user);
      // ACL：设置权限为全量
      // this.aclService.setFull(true);
      // 初始化菜单
      // this.menuService.add(data.menu);
      // 设置页面标题的后缀
      this.titleService.suffix = data.app.name;
    }).toPromise();
  }
}