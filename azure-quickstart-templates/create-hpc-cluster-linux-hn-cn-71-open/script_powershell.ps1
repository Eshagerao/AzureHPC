param([string]$rg = "rg-001", [string]$cnn = "2", [string]$cname = "2")
$vmTemplate="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-open/azuredeploy.json"
cd "C:/Users/Juanjo/Dropbox/SolidQ/1_TFM/Template/github/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-open"
Login-AzureRmAccount
New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -computeNodeNumber $cnn -clusterName $cname