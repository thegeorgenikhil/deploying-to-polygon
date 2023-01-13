from brownie import SimpleStorage, accounts

def main():
    account = accounts.load('main')
    SimpleStorage.deploy({'from': account}, publish_source=True)