import { Module } from '../interfaces';
import { Controller } from './controller';
import { ServiceManager } from './service-manager';

export class App {
  public readonly services: ServiceManager;
  public readonly controllers: Controller<string>[] = [];

  constructor(rootModule: Module) {
    this.services = new ServiceManager();
    this.controllers = this.getControllers(rootModule);
  }

  private getControllers(parentModule: Module): Controller<string>[] {
    const controllers = (parentModule.controllers || []).concat();
    const modules = parentModule.modules || [];
    const path = parentModule.path || '';
    const postHooks = parentModule.postHooks || [];
    const preHooks = parentModule.preHooks || [];

    for (const childModule of modules) {
      controllers.push(...this.getControllers(childModule));
    }

    for (const controller of controllers) {
      controller.addPathAtTheBeginning(path);
      controller.addPreHooksAtTheTop(preHooks);
      controller.addPostHooksAtTheBottom(postHooks);
    }

    return controllers;
  }

}