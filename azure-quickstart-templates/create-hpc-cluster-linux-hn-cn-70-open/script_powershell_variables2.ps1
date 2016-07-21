param([string]$rg = "rg-001", [string]$vmsize = "Standard_A2", [string]$cnn = "1", [string]$cname = "hpc")
$vmTemplate="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-70-open/azuredeploy.json"
Login-AzureRmAccount
Select-AzureRMSubscription -SubscriptionName 0c09ad5b-0e64-44f8-b7f3-7b9e9925d720
New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -headNodeVMSize $vmsize -computeNodeVMSize $vmsize -computeNodeNumber $cnn -clusterName $cname 