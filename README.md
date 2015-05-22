# ng-cpf-cnpj-validate
This package contains two directives to validate the brazilians CPF and CNPJ documents.

## Installing

To install the component just:

```bash
$ bower install ng-cpf-cnpj-validate --save
```

Then, include the necessary files into your index.html as the example below:

```html
    <script src="bower_components/ng-cpf-cnpj-validate/validate-cpf-directive.js"></script>
    <script src="bower_components/ng-cpf-cnpj-validate/validate-cnpj-directive.js"></script>
```

##Usage

After that, you can import the new directive using 'validate-cpf' or 'validate-cnpj' to the `<input />` as the example below:
```html
<input name="cpf" type="text" class="form-control" ng-model="user.cpf" validate-cpf required ng-disabled="isEdit && user.cpf">
```
## Options
You can use this with ui-mask component too, like:
```html
<input name="cpf" type="text" class="form-control" ng-model="user.cpf" validate-cpf ui-mask="999.999.999-99" required ng-disabled="isEdit && user.cpf">
```
