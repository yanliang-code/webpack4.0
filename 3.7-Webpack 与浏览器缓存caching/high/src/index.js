import _ from 'lodash';
import $ from 'jquery';
import { ui } from './jquery.ui.js';
ui();
const dom = $('<div>');
dom.html(_.join(['yl', 'td'], ' 222 '));
$('body').append(dom);
