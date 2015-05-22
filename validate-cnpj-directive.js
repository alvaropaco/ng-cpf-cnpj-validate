/**
 * @author Alvaro Paçó <alvaro@scalasoft.com.br>
 * @see {@link http://www.geradorcnpj.com/javascript-validar-cnpj.htm}
 */
(function () {
  'use strict';

  angular.module('validate-cnpj', [])

  /**
   * Validate CNPJ directive
   * @param {ngModel} model The Model to bind
   * @returns {boolean/'undefined'}
   */
    .directive('validateCnpj', function ($compile) {
      return {
        require: 'ngModel',
        scope: { 'validateCnpj': '=' },
        link: function (scope, element, attrs, ctrl) {
          element.bind("blur", function () {
            //valida o cpf
            ctrl.$setValidity('validateCnpj', validaCNPJ(ctrl.$modelValue));

            if (ctrl.$isEmpty(ctrl.$modelValue)) {
              // consider empty models to be valid
              return true;
            }

            //remove error-message
            element.parent().removeClass('ng-invalid alert-danger');
            element.parent().find('.alert-status-invalid').remove();
            //if value invalido
            if (ctrl.$dirty && ctrl.$invalid) {
              //add error-message
              element.parent().addClass('has-error');
              element.parent().append(' <label class=" alert-status-invalid ' +
                'control-label" for="inputError1">CNPJ Inválido</label>');
              // Needle to work
              return undefined;
            } else {
              //if success remove error-message
              element.parent().removeClass('ng-invalid alert-danger');
              element.parent().find('.alert-status-invalid').remove();
              // Return the same value to work with ui-mask
              // because if return another value, the ui-mask
              // will be called again and validate too.
              return ctrl.$viewValue;
            }
          });

          /**
           * Calculate validity of string
           * @param str
           * @returns {boolean}
           */
          var validaCNPJ = function (str) {
            if (str == null)
              return false;

            str = str.replace(/\./g, '');
            str = str.replace('/', '');
            str = str.replace('-', '');

            var cnpj = str;
            var tamanho;
            var numeros;
            var digitos;
            var soma;
            var pos;
            var resultado;
            var i;

            if (cnpj == '')
              return false;

            if (cnpj.length != 14)
              return false;

            // Regex to validate strings with 14 same characters
            var regex = /([0]{14}|[1]{14}|[2]{14}|[3]{14}|[4]{14}|[5]{14}|[6]{14}|[7]{14}|[8]{14}|[9]{14})/g
            // Regex builder
            var patt = new RegExp(regex);
            if (patt.test(cnpj))
              return false;

            // Valida DVs
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
              soma += numeros.charAt(tamanho - i) * pos--;
              if (pos < 2)
                pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
              return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
              soma += numeros.charAt(tamanho - i) * pos--;
              if (pos < 2)
                pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
              return false;

            return true;
          }

        }
      };
    });

}).call(this);