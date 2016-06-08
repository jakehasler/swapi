import angular from 'angular';
import registerControllers from './controllers';
const ngModule = angular.module('DateHatcher', []);
registerControllers(ngModule);
require('../less/skeleton.less');