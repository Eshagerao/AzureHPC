param([string]$rg = "rg-001")
$vmTemplate="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-intel/azuredeploy.json"
$vmParameter="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-intel/azuredeploy.parameters.json"
Login-AzureRmAccount
New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -TemplateParameterUri $vmParameter