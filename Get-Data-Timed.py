import schedule
import time
import json
from urllib.request import urlopen
def job():
        try:
                f = urlopen('http://192.168.1.70/admin/api.php')
                json_string = f.read()
                parsed_json = json.loads(json_string)
                queries = parsed_json['dns_queries_today']
                adsblocked = parsed_json['ads_blocked_today']
                clients = parsed_json['unique_clients']
                domainsblocked = parsed_json['domains_being_blocked']
                f.close()
        except:
                queries = '-'
                adsblocked = '-'
                clients = '-'
                
        pihole = 'Domains Blocked: ' + str(queries) + ' - ' 'DNS-Queries: ' + str(queries) + ' - ' + 'Ads blocked: ' + str(adsblocked) + ' - ' + 'Devices: ' + str(clients)
        print (pihole)


        # data ={}
        # data['queries']=[]
        # data['queries']
        data = {"queries": [queries]}
        print(queries)
        # f = open("pi-hole-data.txt", "w")
        # f.write(str(queries))
        # f.close()


        with open ('pi-hole-data.json', 'w') as outfile:
                json.dump(data, outfile)
schedule.every(30).seconds.do(job)

while 1:
    schedule.run_pending()
    time.sleep(1)
