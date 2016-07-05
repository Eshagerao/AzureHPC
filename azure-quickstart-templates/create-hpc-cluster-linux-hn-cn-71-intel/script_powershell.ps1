param([string]$rg = "rg-001", [string]$cnn = "2", [string]$cname = "hpc")
$vmTemplate="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-intel/azuredeploy.json"
$vmParameter="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-intel/azuredeploy.parameters.json"
cd "C:/Users/Juanjo/Dropbox/SolidQ/1_TFM/Template/github/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-intel"
Login-AzureRmAccount
Remove-AzureRmResourceGroup -Name rg-001
New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -computeNodeNumber $cnn -clusterName $cname
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -TemplateParameterUri $vmParameter